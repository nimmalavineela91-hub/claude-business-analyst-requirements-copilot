import { useState } from "react";
import "./App.css";

function App() {
  const [requirements, setRequirements] = useState("");
  const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const analyzeRequirements = async () => {
  if (!requirements.trim()) {
    setError("Please enter stakeholder requirements first.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5001/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requirements: requirements,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    setAnalysis(data.analysis);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app">
      <header className="header">
        <div>
          <h2>Claude BA Copilot</h2>
          <p>AI-Powered Requirements Intelligence</p>
        </div>
        <span className="status">● AI Assistant Ready</span>
      </header>

      <main className="container">
        <section className="hero">
          <span className="badge">Powered by Anthropic Claude</span>

          <h1>AI Business Analyst Copilot</h1>

          <p>
            Transform stakeholder notes and business problems into structured,
            actionable requirements.
          </p>
        </section>

        <section className="workspace">
          <div className="input-panel">
            <h2>Stakeholder Input</h2>

            <p>
              Paste meeting notes, business requirements, or stakeholder
              feedback below.
            </p>

            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Example: Customer support requests are currently received through email, phone calls, and spreadsheets. The organization needs a centralized platform..."
            />

<button
  className="analyze-button"
  onClick={analyzeRequirements}
  disabled={loading}
>
  {loading ? "Analyzing with Claude..." : "✦ Analyze with Claude"}
</button>

{error && <p className="error-message">{error}</p>}
          </div>

          <div className="output-panel">
  <h2>Business Analysis Output</h2>

  {analysis ? (
    <div className="analysis-result">
      <pre>{analysis}</pre>
    </div>
  ) : (
    <div className="empty-state">
      <div className="ai-icon">AI</div>
      <h3>Ready to analyze</h3>
      <p>
        Enter stakeholder requirements and Claude will generate
        structured Business Analysis artifacts.
      </p>
    </div>
  )}
</div>
        </section>

        <section className="features">
          <div className="feature-card">
            <span>📋</span>
            <h3>Requirements</h3>
            <p>Functional and non-functional requirements</p>
          </div>

          <div className="feature-card">
            <span>📝</span>
            <h3>User Stories</h3>
            <p>Jira-ready user stories</p>
          </div>

          <div className="feature-card">
            <span>✓</span>
            <h3>Acceptance Criteria</h3>
            <p>Testable acceptance conditions</p>
          </div>

          <div className="feature-card">
            <span>⚠</span>
            <h3>Risks & Gaps</h3>
            <p>Identify ambiguity and missing information</p>
          </div>

          <div className="feature-card">
            <span>?</span>
            <h3>Stakeholder Questions</h3>
            <p>AI-generated clarification questions</p>
          </div>
        </section>
      </main>

      <footer>
        Claude-Powered Business Analyst Requirements Copilot
      </footer>
    </div>
  );
}

export default App;