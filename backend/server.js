const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Anthropic = require("@anthropic-ai/sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "Claude Business Analyst Copilot API is running",
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements || requirements.trim() === "") {
      return res.status(400).json({
        error: "Please provide stakeholder requirements.",
      });
    }

    const prompt = `
    You are an experienced Senior Business Analyst.
    
    Analyze the stakeholder notes below and convert them into a professional,
    structured Business Analysis output.
    
    STAKEHOLDER NOTES:
    ${requirements}
    
    IMPORTANT OUTPUT RULES:
    - Start immediately with "## Executive Summary".
    - Do NOT add a document title before the first section.
    - Do NOT create a project-name heading.
    - Use ONLY "##" for section headings.
    - Do NOT use "#" or "###" headings.
    - Keep every section listed below, even if information is limited.
    - Use concise professional Business Analyst language.
    - Use bullet points where appropriate.
    - Clearly state assumptions instead of inventing unsupported details.
    
    Generate EXACTLY these sections in this exact order:
    
    ## Executive Summary
    Summarize the business problem, proposed solution, and expected business value.
    
    ## Business Objectives
    List measurable or clearly stated business objectives using IDs:
    BO-001, BO-002, BO-003.
    
    ## Stakeholders
    Identify the stakeholder groups involved and briefly describe their interests or responsibilities.
    
    ## Functional Requirements
    Generate functional requirements using IDs:
    FR-001, FR-002, FR-003, etc.
    
    Each requirement should clearly describe what the proposed system must do.
    
    ## Non-Functional Requirements
    Generate applicable non-functional requirements using IDs:
    NFR-001, NFR-002, etc.
    
    Consider usability, performance, availability, security, scalability, and maintainability only when relevant.
    
    ## Business Rules
    Identify business rules supported by the stakeholder notes.
    Use BR-001, BR-002, etc.
    If a rule cannot be confirmed, clearly label it as needing stakeholder validation.
    
    ## User Stories
    Generate user stories in this format:
    
    US-001
    As a [user],
    I want [functionality],
    So that [business value].
    
    ## Acceptance Criteria
    Provide testable acceptance criteria associated with the relevant user stories or functional requirements.
    
    Use AC-001, AC-002, etc.
    
    ## Risks & Gaps
    Identify ambiguities, missing information, dependencies, risks, and requirement gaps.
    
    ## Assumptions
    Clearly list assumptions made because information was not explicitly provided.
    
    ## Stakeholder Questions
    Generate clarification questions that a Business Analyst should ask before finalizing the requirements.
    
    Do not include any introduction, conclusion, document title, or additional section outside the headings above.
    `;
    const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 3000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      
      const result = message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n");
      
      res.json({
        success: true,
        analysis: result,
      });
      
      } catch (error) {
        console.error("Claude API Error:", error);
      
        res.status(500).json({
          success: false,
          error: "Unable to analyze requirements with Claude.",
        });
      }
      });
      
      const PORT = 5001;
      
      app.listen(PORT, () => {
        console.log(`Claude BA Copilot backend running on port ${PORT}`);
      });