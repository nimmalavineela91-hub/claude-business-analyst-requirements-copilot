import { useState } from "react";
import "./App.css";

const allowedSections = [
  "Executive Summary",
  "Business Objectives",
  "Stakeholders",
  "Functional Requirements",
  "Non-Functional Requirements",
  "Business Rules",
  "User Stories",
  "Acceptance Criteria",
  "Risks & Gaps",
  "Assumptions",
  "Stakeholder Questions",
];

function parseAnalysisSections(text) {
  if (!text || !text.trim()) {
    return [];
  }

  const normalizedText = text.replace(/\r\n/g, "\n");

  const sections = normalizedText
    .split(/(?=^#{1,3}\s+)/gm)
    .map((section) => {
      const lines = section.trim().split("\n");

      if (!lines.length) {
        return null;
      }

      const title = lines[0]
        .replace(/^#{1,3}\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .trim();

      const content = lines.slice(1).join("\n").trim();

      return {
        title,
        content,
      };
    })
    .filter(Boolean)
    .filter((section) => section.title && section.content);

  const matchedSections = sections.filter((section) => {
    const sectionTitle = section.title.toLowerCase();

    return allowedSections.some((allowed) => {
      const allowedTitle = allowed.toLowerCase();

      return (
        sectionTitle === allowedTitle ||
        sectionTitle.includes(allowedTitle) ||
        allowedTitle.includes(sectionTitle)
      );
    });
  });

  if (matchedSections.length > 0) {
    return matchedSections;
  }

  return [
    {
      title: "Business Analysis",
      content: normalizedText,
    },
  ];
}

function cleanLine(line) {
  return line
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s*/, "")
    .replace(/^#{1,3}\s*/, "")
    .trim();
}

function App() {
  const [requirements, setRequirements] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeRequirements = async () => {
    if (!requirements.trim()) {
      setError("Please enter stakeholder requirements.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch("http://localhost:5001/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirements: requirements.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to analyze requirements with Claude."
        );
      }

      if (!data.analysis || !data.analysis.trim()) {
        throw new Error("Claude returned an empty analysis.");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      console.error("Analysis error:", err);

      setError(
        err.message ||
          "Unable to connect to the Claude Business Analyst backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const analysisSections = parseAnalysisSections(analysis);

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
              placeholder="Example: Customer support requests are currently received through email, phone calls, and spreadsheets. The organization needs a centralized platform where customers can submit requests, support agents can assign and update tickets, and managers can track resolution time and SLA performance."
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

            {loading ? (
              <div className="empty-state">
                <div className="ai-icon">AI</div>
                <h3>Analyzing requirements</h3>
                <p>
                  Claude is reviewing the stakeholder input and generating
                  structured Business Analysis artifacts.
                </p>
              </div>
            ) : analysis ? (
              <div className="analysis-result">
                {analysisSections.map((section, index) => (
                  <div className="analysis-card" key={`${section.title}-${index}`}>
                    <h3>{section.title}</h3>

                    <div className="analysis-card-content">
                      {section.content
                        .split("\n")
                        .map((line) => cleanLine(line))
                        .filter((line) => line)
                        .map((line, lineIndex) => (
                          <p key={lineIndex}>{line}</p>
                        ))}
                    </div>
                  </div>
                ))}
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
            <span>📄</span>
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
        Claude-Powered Business Analyst Requirement Intelligence
      </footer>
    </div>
  );
}

export default App;