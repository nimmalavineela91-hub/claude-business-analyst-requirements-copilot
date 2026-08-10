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

Analyze the stakeholder notes below and create a professional Business Analysis output.

STAKEHOLDER NOTES:
${requirements}

Generate the response using these sections:

1. Executive Summary

2. Business Objectives

3. Stakeholders

4. Functional Requirements
Use IDs such as FR-001, FR-002, FR-003.

5. Non-Functional Requirements
Use IDs such as NFR-001, NFR-002.

6. Business Rules

7. User Stories
Use this format:
As a [user],
I want [functionality],
So that [business value].

8. Acceptance Criteria

9. Risks and Gaps

10. Assumptions

11. Stakeholder Clarification Questions

Keep the output professional, structured, realistic, and suitable for a Business Analyst requirements document.

Do not invent highly specific business rules when the stakeholder notes do not provide enough information. Instead, identify them as assumptions or clarification questions.
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