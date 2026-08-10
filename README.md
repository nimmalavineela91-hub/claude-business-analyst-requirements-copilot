# AI Business Analyst Copilot

An AI-powered Business Analysis application that transforms unstructured stakeholder notes, meeting discussions, and business problems into structured, actionable BA artifacts using Anthropic Claude.

The project demonstrates how Generative AI can support a Business Analyst during requirements discovery, analysis, documentation, and clarification.

---

## Application Demo

![AI Business Analyst Copilot Demo](screenshots/ai-ba-copilot-demo.png)

---

## Business Problem

Business Analysts often receive requirements through multiple unstructured sources such as:

- Stakeholder meetings
- Emails
- Business notes
- Customer feedback
- Operational discussions
- High-level problem statements

Manually converting this information into structured requirements can be time-consuming and may introduce ambiguity, missing requirements, or inconsistent documentation.

The AI Business Analyst Copilot helps accelerate this process by analyzing stakeholder input and generating structured Business Analysis artifacts.

---

## Solution

The application allows a Business Analyst to enter raw stakeholder requirements into a simple interface.

The input is sent to a Node.js backend, which securely communicates with the Anthropic Claude API.

Claude analyzes the business context and generates structured BA documentation that is displayed as individual analysis sections in the React interface.

### Workflow

Stakeholder Input  
↓  
React User Interface  
↓  
Node.js / Express Backend  
↓  
Anthropic Claude API  
↓  
AI Requirements Analysis  
↓  
Structured Business Analysis Output

---

## Business Analysis Artifacts Generated

The application can generate:

1. Executive Summary
2. Business Objectives
3. Functional Requirements
4. Non-Functional Requirements
5. Business Rules
6. User Stories
7. Acceptance Criteria
8. Risks & Gaps
9. Assumptions
10. Stakeholder Clarification Questions

These outputs help convert early-stage stakeholder information into artifacts that can support requirement refinement and stakeholder discussions.

---

## Example Use Case

### Stakeholder Problem

A customer support organization manages requests across email, phone calls, and spreadsheets.

This creates:

- Duplicate requests
- Slow response times
- Limited operational visibility
- Inconsistent support processes
- Difficulty monitoring SLA performance

### AI-Assisted Analysis

The Business Analyst enters the stakeholder notes into the application.

Claude analyzes the information and generates structured outputs such as:

- Business objectives for centralizing support operations
- Functional requirements for ticket management
- Role-based access requirements
- User stories for customers, agents, and managers
- Acceptance criteria
- Business rules
- Risks and missing information
- Questions requiring stakeholder clarification

---

## Architecture

```text
Business Analyst / Stakeholder
            |
            v
      React Frontend
            |
            | POST /api/analyze
            v
    Node.js + Express API
            |
            v
     Anthropic Claude API
            |
            v
  Requirements Intelligence
            |
            v
 Structured BA Artifacts
```

---

## Technology Stack

### Frontend

- React
- JavaScript
- CSS
- Vite

### Backend

- Node.js
- Express.js

### AI Integration

- Anthropic Claude API
- Prompt Engineering

### Development

- Git
- GitHub
- Visual Studio Code
- REST API integration

---

## Key Features

- Converts unstructured stakeholder input into structured requirements
- Generates multiple Business Analysis artifacts from a single input
- Identifies potential risks, gaps, and assumptions
- Generates stakeholder clarification questions
- Creates user stories and acceptance criteria
- Separates AI-generated output into readable analysis sections
- Uses a backend API layer to keep AI integration separate from the frontend
- Provides a responsive Business Analyst workspace

---

## Why This Project Matters

Generative AI does not replace stakeholder collaboration or Business Analyst judgment.

Instead, this project demonstrates how AI can act as a requirements intelligence assistant by helping analysts:

- Accelerate initial requirement analysis
- Identify missing information earlier
- Improve documentation consistency
- Generate questions for requirement clarification
- Convert raw business discussions into structured artifacts
- Spend more time validating business needs and less time formatting documentation

---

## Security

The Anthropic API key is stored in an environment variable and is not hard-coded into the frontend application.

Example:

```env
ANTHROPIC_API_KEY=your_api_key
```

The `.env` file should remain excluded from source control through `.gitignore`.

---

## Future Enhancements

Potential future capabilities include:

- Requirement document upload
- PDF/DOCX requirement analysis
- Requirement prioritization
- MoSCoW classification
- Requirements Traceability Matrix (RTM)
- Jira integration
- Requirement quality scoring
- Duplicate requirement detection
- Export to BRD/FRD
- AI-assisted change impact analysis

---

## Project Goal

The goal of this project is to demonstrate the practical application of Generative AI in Business Analysis by combining:

**Business Analysis + Requirements Engineering + Prompt Engineering + Claude AI + Application Development**

to create an AI-assisted requirements analysis workflow.