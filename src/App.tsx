import { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import TendernessTicker from "./components/TendernessTicker";
import DepartmentSeal from "./components/DepartmentSeal";
import Archive from "./components/Archive";
import FileIncident from "./components/FileIncident";
import "./App.css";

type Tab = "archive" | "file";

function getTabFromHash(): Tab {
  const hash = window.location.hash.replace("#/", "").replace("#", "");
  return hash === "file" ? "file" : "archive";
}

function App() {
  const [tab, setTab] = useState<Tab>(getTabFromHash);
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useCallback((t: Tab) => {
    window.location.hash = `#/${t}`;
    setTab(t);
  }, []);

  useEffect(() => {
    const onHashChange = () => setTab(getTabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleFiled = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const goToArchive = useCallback(() => {
    navigate("archive");
  }, [navigate]);

  return (
    <div className="app">
      <Header />
      <TendernessTicker />

      <main className="app-main">
        <div className="app-title-block">
          <div className="app-title-text">
            <h1 className="app-title">
              New York City
              <br />
              Department of Tenderness
            </h1>
            <p className="app-subtitle">Love Incident Archive Portal</p>
          </div>
          <DepartmentSeal />
        </div>

        <nav className="app-tabs">
          <button
            className={`app-tab ${tab === "archive" ? "app-tab--active" : ""}`}
            onClick={() => navigate("archive")}
          >
            Archive
          </button>
          <button
            className={`app-tab ${tab === "file" ? "app-tab--active" : ""}`}
            onClick={() => navigate("file")}
          >
            File Incident
          </button>
        </nav>

        <div className="app-content">
          {tab === "archive" && <Archive key={refreshKey} />}
          {tab === "file" && (
            <FileIncident onFiled={handleFiled} onViewArchive={goToArchive} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} City of New York. Department of
          Tenderness. All feelings (tenderly) reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
