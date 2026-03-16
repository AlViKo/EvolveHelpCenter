---
title: "The L&D Playbook: How to Build AI Simulations & AI-Powered Courses"
slug: "ld-playbook-ai-simulations-and-courses"
collection: "simulators"
content_type: "overview"
visibility: "admin"
description: "A practical guide to building AI simulations for skill practice and using AI agents to create courses from your existing materials."
author: "Evolve Team"
owner: "elina@evolveplatform.ai"
status: "published"
sort_order: 1
tags:
  - simulators
  - ai
  - course-creation
  - role-play
  - training
created_at: "2026-03-16"
updated_at: "2026-03-16"
last_reviewed_at: "2026-03-16"
---

We're the Evolve team — we've been building AI into corporate learning since 2023. We've created courses, knowledge bases, and AI simulations for companies like Carlsberg, Schneider Electric, and Freedom Pay.

Having built hundreds of courses and simulations across different markets and industries, we've learned that AI simulations are the most effective way to boost your team's performance and get them genuinely engaged in training. We also know exactly how to make course creation several times faster.

That's what we're sharing in this playbook.

## What's Inside

- AI Simulations for Practice & Skill Building
- How to build a simple version
- AI-Enhanced Content Creation
- Writer agent prompt (Kolb's learning cycle)

---

## AI Simulations for Practice & Skill Building

You want your training to actually engage people — not just make them click through slides. You want interactive scenarios, real-world practice, something that makes employees think instead of just passing a test.

Companies like Bank of America, Walmart, Accenture, Schneider Electric, Carlsberg, and others already use AI simulations for exactly this — and it's the most effective way to train the specific skills each person is missing, without pulling managers into the process every time.

## How AI Simulations Work

1. You identify each employee's weak spots based on assessments, completed courses, or call analysis (you can build this with AI agents).

2. Then an AI agent plays the role of a client, mentor, or negotiation counterpart.

3. Sales, customer success and other team members go through at least one role-play or simulator with AI every day.

![AI simulation scenario — Team Conflict with voice interaction](/images/sim-scenario-team-conflict.png)

4. Every session generates a unique scenario focused on that person's specific gaps.

5. The interface can range from a text-based simulator to a real-time voice conversation with an AI avatar.

![AI virtual assistant avatar for simulation practice](/images/sim-virtual-assistant-avatar.png)

6. There can be two types of scenarios: a **client scenario**, where the employee practices with a simulated customer or counterpart, and a **mentor scenario**, where AI acts as a senior colleague walking them through a situation step by step.

7. After each simulation, AI delivers a detailed breakdown: mistakes, strengths, specific recommendations, and an assessment visible to HR and managers.

![Simulation results showing scores across multiple criteria](/images/sim-results-scoring.png)

> It is fully customizable to the specific employee and goals: client persona, script, agent behavior, difficulty level.

## How to Build a Simple Version

### Step 1 — Define your avatars, scenarios, and system prompts

For each role and scenario you configure:

**Who the agent is** (persona, background, personality, role). For sales or support call simulations, you describe your ICP or a typical client. For example:

> You're Martin, 45, chief engineer at a manufacturing plant. Your facility runs 24/7, any downtime costs the company thousands per hour. You're evaluating equipment upgrades but need to justify every purchase to management. You're technical, direct, and expect the rep to know the product inside out.

Or for a mentor scenario:

> You're a senior project manager with 12 years at the company. A new hire just joined your team and is about to run their first client kickoff meeting. Walk them through the process step by step — ask what they would do first, how they'd prepare the agenda, what questions they'd ask the client. If they miss something important, don't give the answer right away — ask a guiding question to help them figure it out.

**How they talk** (tone, style, conversation guidelines), for example:

- Maintain a calm, supportive tone.
- Speak in a conversational, encouraging manner.
- Ask questions more often than make statements.
- Pause after each question, give time to think.

**Customize the prompt for each scenario and role.** From here, you tailor the prompt depending on what exactly you need from each simulation. You define an objective and tasks for the agent and specific instructions for different situations, for example:

- If the customer's response is unclear, ask clarifying questions.
- If you encounter any issues, inform the customer politely and ask to repeat.

**How to score the rep after the session.** Define evaluation criteria with weights, for example:

```
Opening (greeting, introduction, confirming availability)
Discovery (open-ended questions, identifying pain points, understanding context)
Value pitch (connecting the offer to needs, specific benefits, relevant examples)
Objection handling (active listening, reframing, confident responses)
Closing and next steps (asking for commitment, setting specific next steps)
```

The assessment agent should be a separate agent that reviews the full conversation after the session and scores the rep's performance based on your criteria.

**Resources on prompt engineering** to help you write better system prompts:

- [Vapi Prompting Guide](https://docs.vapi.ai/prompting-guide)
- [Learn Prompting](https://learnprompting.org/)
- [Prompting Guide AI](https://www.promptingguide.ai/)
- [OpenAI's guide to prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering)

### Step 2 — Assemble the stack

**For a voice-based simulator**, you can use [Vapi](https://vapi.ai), a platform for building voice AI agents. It works like a constructor where you connect all the components together:

- **LLM** (GPT-4o works best for this task) generates the agent's responses based on your prompt and scenario.
- **ElevenLabs** converts those responses into natural-sounding speech in real time.
- **Deepgram** transcribes the employee's spoken responses into text for the LLM to process.

**For a text-based simulator**, you can build one on [N8N](https://n8n.io), for example, where you hook up GPT working off your prompt to any interface you need (web chat, Slack, etc.).

Some learning platforms also offer built-in simulation features. For example, **Evolve** built functionality where simulators are auto-generated from course content and the employee's existing assessment results. The platform identifies the employee's weak spots based on how they performed in the course and generates a simulation that specifically targets those gaps. Each session is fully unique, regenerated every time.

Results feed into the employee's profile, where the platform combines simulator performance with course completion, open-ended answers, and 360 reviews, giving the manager a full picture of each employee's strengths and gaps.

## Why It Matters

Role-plays with a manager or trainer are the most effective method for sales training, but they eat up the sales manager's time. On top of coaching, managers deal with processes, cross-team coordination, and a dozen other things. Running daily role-plays with every rep on the team is simply not realistic.

An AI simulator takes this entire routine off the manager's plate and runs it for the whole team, every single day. Previously, between discovering a problem (say, a rep handles objections poorly) and fixing it, a week or two would pass — and during all that time the rep was wasting leads. An AI simulator collapses the feedback loop to a single day.

---

## AI-Enhanced Content Creation

You have SOPs, product documentation, onboarding guides, compliance materials sitting in PDFs and Word files, and turning all of that into actual courses normally takes weeks of instructional designer's time, because someone has to read through everything, figure out the structure, rewrite the content in a way that's actually learnable, and then proofread the whole thing.

With AI agents, you can compress this entire pipeline into hours, because each stage of course creation is handled by a separate agent with its own role, and they work sequentially, one after another, passing the result to the next.

## How AI Content Creation Works

You upload your source materials — PDFs, Word docs, presentations, whatever you have — and set the parameters:

- **Company description** — what the company does, what products or services it offers, which regions it operates in, key business specifics. The agent needs this context to correctly interpret the source materials and maintain the right tone.
- **Course title**
- **Who this course is for** — department, level, role (e.g., "sales team, new account managers"), new employees or existing.
- **Course goal** — what specifically the employee should be able to do or understand after completing the course.
- **Material processing preference** — keep the text as is (just structure it), stylistically adapt it (rewrite into a softer, more engaging learning format), or simplify and shorten to the key points.
- **Estimated course duration and lesson length**
- **Course language**
- **Tone of voice**

![Course creation form with material upload and processing options](/images/sim-course-creation-form.png)

From there, three agents take over:

### 1. Content Extractor

It reads through all your source documents, pulls out what's relevant, and builds a course structure: which chapters, which lessons, what content goes where. It accounts for everything you specified — length, depth, what to include, what to skip. You can review the structure after this step and adjust it before moving on.

### 2. Writer

It takes the structure from the first agent and composes the actual lesson text. In the writer's prompt you set the tone of voice and how to work with the source materials: keep the text as is and just split it into lessons, stylistically adapt it into a softer learning format, or simplify and shorten to the key points.

This is also where you can set the learning methodology like Kolb's learning cycle.

![Generated course structure with chapters and assignments](/images/sim-course-structure-chapters.png)

## Writer Agent Prompt (Kolb's Learning Cycle)

If you want to apply the Kolb's learning cycle methodology to your AI-generated courses, use this as the writer agent prompt:

```
You will receive source text: plain documentation, tables,
definitions, or technical descriptions.
Your task is to transform this text into a lesson for an
introductory self-paced online course.
Write concisely, to the point, and in clear language.
```

---

## Get Started

If you want to find out how your specific processes can be optimized and how to build a truly great training system — [book a free scoping session with Evolve](https://evolveplatform.ai).
