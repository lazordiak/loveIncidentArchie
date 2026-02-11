import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabase";
import type { LoveIncident } from "../types";
import { useAdmin } from "../hooks/useAdmin";
import IncidentModal from "./IncidentModal";
import "./Archive.css";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Archive() {
  const isAdmin = useAdmin();
  const [incidents, setIncidents] = useState<LoveIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selected, setSelected] = useState<LoveIncident | null>(null);

  const fetchIncidents = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("love_incidents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (err) {
      setError(
        "Failed to retrieve incidents from the civic archive. Please try again.",
      );
      console.error(err);
    } else {
      setIncidents(data as LoveIncident[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Derive unique incident types for the filter dropdown
  const incidentTypes = useMemo(() => {
    const types = new Set<string>();
    incidents.forEach((i) => {
      if (i.incident_type && i.incident_type.trim()) {
        types.add(i.incident_type.trim());
      }
    });
    return Array.from(types).sort();
  }, [incidents]);

  // Filter incidents client-side
  const filtered = useMemo(() => {
    let result = incidents;

    if (typeFilter) {
      result = result.filter((i) => i.incident_type === typeFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.location.toLowerCase().includes(q) ||
          i.story.toLowerCase().includes(q),
      );
    }

    return result;
  }, [incidents, search, typeFilter]);

  const handleSurpriseMe = () => {
    if (filtered.length === 0) return;
    const idx = Math.floor(Math.random() * filtered.length);
    setSelected(filtered[idx]);
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase
      .from("love_incidents")
      .delete()
      .eq("id", id);

    if (err) {
      alert("Delete failed. The archive resists.");
      console.error(err);
      return;
    }
    setIncidents((prev) => prev.filter((i) => i.id !== id));
    setSelected(null);
  };

  if (loading) {
    return <div className="archive-status">Fetching archived incidents...</div>;
  }

  if (error) {
    return (
      <div className="archive-status archive-error">
        {error}
        <button className="archive-retry" onClick={fetchIncidents}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="archive">
      {/* Total counter */}
      <div className="archive-total">
        <span className="archive-total-count">
          Total Love Incidents Filed: {incidents.length}
        </span>
        {incidents.length === 0 && (
          <span className="archive-total-empty">
            The archive is currently emotionally unpopulated.
          </span>
        )}
        {(search.trim() || typeFilter) && incidents.length > 0 && (
          <span className="archive-total-showing">
            Showing: {filtered.length}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="archive-controls">
        <input
          className="archive-search"
          type="text"
          placeholder="Search by location or story..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="archive-controls-row">
          <select
            className="archive-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Incident Types</option>
            {incidentTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            className="archive-surprise"
            onClick={handleSurpriseMe}
            disabled={filtered.length === 0}
          >
            Surprise Me
          </button>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="archive-status">
          No incidents found. LOA (level of affection) fluctuation is low today.
        </div>
      ) : (
        <div className="archive-list">
          {filtered.map((incident) => (
            <button
              key={incident.id}
              className="archive-card"
              onClick={() => setSelected(incident)}
            >
              <div className="archive-card-top">
                <span className="archive-card-location">
                  {incident.location}
                </span>
                {incident.incident_type && (
                  <span className="archive-card-badge">
                    {incident.incident_type}
                  </span>
                )}
              </div>
              <div className="archive-card-meta">
                <span>Tenderness Level: {incident.tenderness_level}/5</span>
                {incident.era && (
                  <span className="archive-card-era">{incident.era}</span>
                )}
              </div>
              <div className="archive-card-bottom">
                {incident.nickname && (
                  <span className="archive-card-nick">
                    Filed by: {incident.nickname}
                  </span>
                )}
                <span className="archive-card-date">
                  {formatDate(incident.created_at)}
                </span>
              </div>
              {isAdmin && (
                <span
                  className="archive-card-delete"
                  role="button"
                  title="Delete incident"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        "This will remove the incident from the archive. Proceed?",
                      )
                    ) {
                      handleDelete(incident.id);
                    }
                  }}
                >
                  &#x1F5D1;
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <IncidentModal
          incident={selected}
          isAdmin={isAdmin}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Archive;
