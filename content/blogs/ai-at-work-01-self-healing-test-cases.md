---
title: "AI Took Over 80% of Our Test-Fixing Work. Not by Replacing QA, but by Fitting Into It."
date: 2026-10-10
author: Vijay Saini
tags: AI at Work, AI Agents, Test Automation, Playwright, Enterprise GenAI
---

# AI Took Over 80% of Our Test-Fixing Work. Not by Replacing QA, but by Fitting Into It.

*AI at Work, Week 1: real enterprise problems I solve with AI each week. No demos, no hype.*

<div class="promo-box">
  <span class="promo-icon">⚡</span>
  <h3>The 30-second version</h3>
  <p><b>Problem:</b> customer-specific changes kept breaking our automated UI tests, and QA engineers spent their days fixing them by hand.<br>
  <b>What I built:</b> an AI agent that reads the failure, finds the broken test in the repo, fixes it, opens a PR, and re-runs the tests until they pass.<br>
  <b>Result:</b> about <b>80%</b> of the fixes that used to need a QA engineer are now handled by the agent.</p>
  <p>Want the details I left out of this post, or want to try this in your own team? <b>Email me: <a href="mailto:vijaysainiprofessional@gmail.com?subject=AI%20at%20Work%20%E2%80%94%20self-healing%20tests">vijaysainiprofessional@gmail.com</a></b>. I read every one.</p>
</div>

Everyone is talking about RAG, agents and agentic RAG. Here's my honest opinion: **none of it matters if it doesn't solve a problem someone at work actually has.** You can explain agentic RAG all day and still not remove a single hour of real work.

So this series is the opposite. Each week, one problem from an enterprise, how AI fixed it, and what I learned.

## The problem: the test suite that never stayed green

We work with a large enterprise **warehouse management system (WMS)**: many applications, many screens, many APIs.

The product team maintains an automated **Playwright** test suite for the **core** product. That part is fine.

The trouble is **customers**. Each customer customises the product:
- one adds a new screen
- another adds a new report
- another adds new widgets or a new mandatory field on a form

The product team doesn't write tests for each customer's version, and it can't. So a separate test team takes the core suite and adapts it for every customer.

Here's what their week looked like:

1. The pipeline runs the tests and they **fail**, because a customisation changed something.
2. A QA engineer opens the **logs and screenshots** to work out why.
3. They fix the test script and run it again.
4. **It fails on a different screen.** Back to step 2.

That's repetitive, skilled, manual work, and it never ends, because customers keep customising.

## Nobody had both halves of the knowledge

I understand AI. I didn't understand QA. The QA engineers understood QA deeply, but not AI.

So I didn't start by writing code. **I sat with a QA engineer and watched how they fix a failing test.** What do they look at first? How do they tell *"the app changed"* from *"the test is wrong"*? Where in the repo do they go? What does a good fix look like?

Then I turned that know-how into an **AI skill**, in the sense Anthropic uses the word: a packaged set of instructions and steps the agent loads when it needs them. It's not a human skill. Basically, the QA engineer's troubleshooting playbook, written down so an agent can follow it.

## What the agent does

When the pipeline reports a failure, the agent:

1. **Reads the evidence the pipeline already produces:** the error log and the screenshots.
   *Example: the log says a value is missing for a field that's now mandatory, because this customer added a new required element to the form.*
2. **Clones the latest code** and goes through the test repository the way a developer would.
3. **Matches the failure to a known pattern** from the skill, and finds the exact test file and step responsible.
4. **Makes the fix**, for example supplying a valid value for the new mandatory field.
5. **Pushes to a feature branch and opens a pull request.** It never touches the main branch.
6. **Runs the tests again.** If the same scenario still fails, it goes back to step 1 with the new evidence.
7. When the tests pass, it **notifies the team**: *"Here's what failed, here's what I changed, the tests are green. Please review and merge."*

A human still merges every change.

## The result

About **80%** of the cases that used to need a QA engineer to investigate and fix are now handled by the agent, from one customer's version to the next. The QA engineers spend their time on the 20% that need judgement: new screens and real product questions.

## The lesson: respect the process

This is the part I want you to remember, more than any of the technology.

**You can't change everything, even with very capable AI.** The pipeline, the logs, the screenshots, the pull-request review: those processes were built over years for good reasons, and the team trusts them.

So the agent doesn't replace any of them. It **fits in**:
- It reads the logs the pipeline already writes.
- It works in the same repository.
- It hands its work back through the same PR review a human would use.

Nobody had to learn a new tool, and nobody had to trust a black box. That's why it was adopted.

The temptation with AI is to redesign the whole workflow around your agent. Resist it, at least for now. **Find the slowest, most repetitive step in an existing process, and fit AI exactly there.**

## What I left out

There's a lot more to this than fits in one post:
- how the skill is structured
- which failures the agent should *not* try to fix
- how it knows when to stop retrying and hand over to a human
- what went wrong in the first versions

If you're working on something similar, or you're a QA or DevOps engineer wondering what this would look like in your team, **write to me at [vijaysainiprofessional@gmail.com](mailto:vijaysainiprofessional@gmail.com?subject=AI%20at%20Work%20%E2%80%94%20self-healing%20tests).** I'm happy to go deeper.

Next week in *AI at Work*: another real problem, and how it got solved.

<div class="promo-box">
  <span class="promo-icon">🧭</span>
  <h3>Building your own skills for this kind of work?</h3>
  <p>My free DevOps 2026 Curriculum and GenAI Playbook cover the path: cloud, CI/CD, Kubernetes, then AI agents that work inside real pipelines.</p>
  <a href="download.html" class="btn btn-outline">🧭 Get the free guides</a>
</div>
