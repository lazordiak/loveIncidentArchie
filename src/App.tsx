import { useState, useCallback } from "react";
import Header from "./components/Header";
import TendernessTicker from "./components/TendernessTicker";
import Archive from "./components/Archive";
import FileIncident from "./components/FileIncident";
import "./App.css";

type Tab = "archive" | "file";

function App() {
  const [tab, setTab] = useState<Tab>("archive");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFiled = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const goToArchive = useCallback(() => {
    setTab("archive");
  }, []);

  return (
    <div className="app">
      <Header />
      <TendernessTicker />

      <main className="app-main">
        <div className="app-title-block">
          <h1 className="app-title">
            New York City
            <br />
            Department of Tenderness
          </h1>
          <p className="app-subtitle">Love Incident Archive Portal</p>
        </div>

        <nav className="app-tabs">
          <button
            className={`app-tab ${tab === "archive" ? "app-tab--active" : ""}`}
            onClick={() => setTab("archive")}
          >
            Archive
          </button>
          <button
            className={`app-tab ${tab === "file" ? "app-tab--active" : ""}`}
            onClick={() => setTab("file")}
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
