---
title: "Complete Guide to Course Design"
slug: "complete-guide-to-course-design"
collection: "course-creation"
content_type: "guide"
visibility: "admin"
description: "An end-to-end walkthrough for designing, building, and launching effective courses on the Evolve platform."
author: "Evolve Team"
owner: "elina@evolveplatform.ai"
status: "published"
sort_order: 3
tags:
  - course-design
  - instructional-design
  - quizzes
  - media
  - publishing
created_at: "2026-03-16"
updated_at: "2026-03-16"
last_reviewed_at: "2026-03-16"
---

Designing a great course is about more than uploading slides. This guide walks you through the entire process — from initial planning to post-launch analytics — so you can create learning experiences that actually stick.

## Planning Your Course

Before you open the course builder, spend time clarifying what you want learners to walk away with.

### Define Learning Objectives

Every course should have 2–5 concrete learning objectives. These are statements that describe what a learner will be able to **do** after completing the course — not just what they'll "understand."

Good objectives follow the formula: **"By the end of this course, you will be able to [action verb] + [specific outcome]."**

Examples:
- "Configure SSO for your organization using SAML 2.0."
- "Create and publish a three-module course with embedded quizzes."
- "Interpret learner engagement reports to identify at-risk employees."

Avoid vague verbs like "understand," "learn," or "be familiar with." Use measurable verbs: configure, create, analyze, troubleshoot, compare.

### Identify Your Audience

Consider who will take the course:

- **Role**: Are they new hires, managers, technical staff?
- **Prior knowledge**: Can you assume baseline familiarity, or do you need to start from scratch?
- **Motivation**: Is this mandatory compliance training or optional skill-building?
- **Time constraints**: Do learners have 20 minutes or 2 hours?

These factors shape everything from content depth to assessment difficulty.

### Outline the Structure

Before creating content, sketch a high-level outline:

1. **Introduction** — What the course covers and why it matters.
2. **Core modules** — The main teaching content, broken into logical chunks.
3. **Practice** — Exercises, quizzes, or scenarios where learners apply what they've learned.
4. **Summary** — Key takeaways and next steps.

A typical Evolve course has 3–7 modules. Each module should take 5–15 minutes to complete. If a module runs longer than 15 minutes, split it.

## Structuring Chapters and Modules

Evolve courses are organized into **modules**, and each module contains one or more **pages**. Think of modules as chapters and pages as the individual screens within each chapter.

### Module Best Practices

- **One concept per module.** Don't pack multiple topics into a single module. If you're covering "Setting Up Users" and "Configuring Permissions," make those two separate modules.
- **Start with context.** The first page of each module should explain why this topic matters and what the learner will do.
- **End with a checkpoint.** Close each module with a quick quiz or reflection question to reinforce the material.
- **Keep it scannable.** Use short paragraphs, bullet points, and bold text for key terms. Walls of text kill engagement.

### Page Types

Evolve supports several page types:

| Page Type | Best For |
|-----------|----------|
| **Text** | Explanations, definitions, step-by-step instructions |
| **Video** | Demonstrations, talking-head introductions, screen recordings |
| **Image + Text** | Annotated screenshots, diagrams with explanations |
| **Quiz** | Knowledge checks, graded assessments |
| **File Download** | Templates, reference documents, checklists |

Mix page types within a module to maintain variety. A module that's entirely text pages will feel monotonous regardless of how well it's written.

## Adding Quizzes and Assessments

Quizzes serve two purposes: they help learners retain information (retrieval practice), and they give you data on comprehension.

### Quiz Types

Evolve supports these question formats:

- **Multiple choice** — One correct answer from 3–5 options. Best for factual recall.
- **Multiple select** — Two or more correct answers. Best for "select all that apply" scenarios.
- **True/False** — Simple binary questions. Use sparingly; they're easy to guess.
- **Short answer** — Learner types a free-text response. Best for reflection questions. These are not auto-graded.
- **Ordering** — Learner arranges items in the correct sequence. Great for process-oriented content.

### Writing Effective Questions

- **Test the objective, not trivia.** Every question should map to a learning objective.
- **Avoid "all of the above."** It's a lazy option that doesn't test real understanding.
- **Make distractors plausible.** Wrong answers should reflect common misconceptions, not obviously absurd options.
- **Provide feedback.** For every answer (correct and incorrect), add a brief explanation. This is where real learning happens.

### Setting Pass Thresholds

Navigate to **Course Settings > Assessments** to configure:

- **Pass percentage**: The minimum score required to complete the course (default: 70%).
- **Retry attempts**: How many times a learner can retake a quiz (default: unlimited).
- **Randomization**: Whether question order and answer order are shuffled per attempt.

## Uploading Media and Resources

Rich media makes courses more engaging, but only when used purposefully.

### Video Guidelines

- **Keep videos under 6 minutes.** Engagement drops sharply after that. If your content needs more time, split it into multiple videos.
- **Supported formats**: MP4, MOV, WebM. Maximum file size: 500 MB.
- **Add captions.** Evolve supports SRT and VTT caption files. Upload them alongside your video for accessibility.
- **Use the built-in recorder.** Evolve has a screen + webcam recorder under **Course Builder > Add Page > Record Video**. This is the fastest way to create quick explainer videos.

### Image Guidelines

- **Use screenshots for software training.** Annotate them with arrows and highlights using the built-in image editor.
- **Supported formats**: PNG, JPG, SVG, GIF. Maximum file size: 20 MB.
- **Add alt text.** Every image should have descriptive alt text for screen readers.

### Downloadable Resources

You can attach files to any page. Common use cases:

- PDF checklists or reference guides
- Excel templates
- Slide decks for offline review

Files are attached via **Add Page > File Download** or by dragging files into the page editor.

## Setting Deadlines and Enrollment Rules

Deadlines create urgency and help managers track compliance.

### Due Dates

You can set deadlines at two levels:

- **Course-level deadline**: A fixed date by which all enrolled learners must complete the course. Set this under **Course Settings > Deadlines**.
- **Relative deadline**: A number of days after enrollment. Useful for onboarding courses where learners start at different times (e.g., "Complete within 14 days of enrollment").

Learners see deadline reminders in their dashboard. Evolve sends automatic email reminders at 7 days, 3 days, and 1 day before the deadline.

### Enrollment Methods

| Method | How It Works |
|--------|-------------|
| **Manual** | Admin enrolls specific users or groups from the course settings page |
| **Self-enrollment** | Course appears in the catalog; learners enroll themselves |
| **Auto-enrollment** | Rules-based: automatically enroll users based on role, department, or team membership |
| **Learning Path** | Course is part of a structured sequence; learners are enrolled when they reach it in the path |

For compliance training, use **auto-enrollment** with a **relative deadline** to ensure every new hire is automatically assigned the course on their start date.

## Publishing Your Course

Publishing makes the course visible and accessible to learners. Before you publish, run through this checklist.

### Pre-Publish Checklist

- [ ] All modules are complete and in the correct order
- [ ] Every quiz question has been reviewed for accuracy
- [ ] Videos play correctly and have captions
- [ ] Images have alt text
- [ ] The course description and thumbnail are set
- [ ] Deadlines and enrollment rules are configured
- [ ] At least one test learner has completed the course end-to-end

### Publishing Options

- **Publish Now**: The course goes live immediately.
- **Schedule**: Set a future date and time for automatic publishing.
- **Publish to Specific Groups**: Restrict visibility to certain teams or departments before a wider rollout.

Navigate to **Course Builder > Publish** to access these options.

### Making Updates After Publishing

You can edit a published course at any time. Changes are saved as a draft until you click **Republish**. Learners who are mid-course will see the updated content the next time they open a page. Completed progress is never reset by content updates.

## Tracking Results and Learner Analytics

Once your course is live, Evolve provides detailed analytics to help you measure effectiveness.

### Course Dashboard

Every course has a **Dashboard** tab showing:

- **Enrollment count**: Total learners enrolled.
- **Completion rate**: Percentage who have finished the course.
- **Average score**: Mean quiz score across all learners.
- **Average time**: How long learners typically take to complete the course.
- **Drop-off points**: Which pages have the highest exit rates.

### Individual Learner Reports

Click any learner's name to see their detailed progress:

- Pages viewed and time spent on each
- Quiz attempts and scores per question
- Completion timestamp and certificate status

### Exporting Data

Click **Export** on the course dashboard to download a CSV with all learner data. This is useful for compliance reporting or sharing results with stakeholders who don't have Evolve access.

### Using Analytics to Improve

Pay attention to these signals:

- **High drop-off on a specific page** — The content may be too long, confusing, or irrelevant. Consider splitting or rewriting it.
- **Low quiz scores on a question** — The question may be poorly worded, or the teaching content may not adequately cover the topic.
- **Long completion times** — Learners may be struggling. Add more examples or simplify the language.

Iterate on your course based on data, not assumptions. The best courses are the ones that improve over time.

## Frequently Asked Questions

**Q: What is the recommended length for a course?**

A: Most effective courses on Evolve contain 3 to 7 modules, with each module taking 5 to 15 minutes to complete. This keeps total course duration between roughly 20 minutes and 2 hours. If your content exceeds that range, consider splitting it into a multi-course learning path.

**Q: Can multiple authors collaborate on the same course?**

A: Yes. Navigate to **Course Settings > Collaborators** to invite other team members as co-authors. Co-authors can edit modules, add quizzes, and upload media. Only the course owner can publish or delete the course, ensuring a clear approval workflow.

**Q: How do I archive a course that is no longer needed?**

A: Open the course in the Course Builder, go to **Course Settings > Status**, and select **Archive**. Archived courses are hidden from the catalog and can no longer be enrolled in, but all historical learner data and completion records are preserved. You can restore an archived course at any time.

**Q: What format is used when exporting analytics data?**

A: Course analytics are exported as a **CSV file**. The export includes one row per learner with columns for enrollment date, completion status, quiz scores, time spent, and certificate status. You can open the file in any spreadsheet application or import it into your reporting tools.
