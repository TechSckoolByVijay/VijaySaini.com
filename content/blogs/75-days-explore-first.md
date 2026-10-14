---
title: "75 Days Left This Year: Explore First, Specialise Later"
date: 2026-10-14
author: Vijay Saini
tags: Career, DevOps, Kubernetes, Cloud, SRE, Learning Plan
---

# 75 Days Left This Year: Explore First, Specialise Later

*A calm, 30-minutes-a-day plan for sysadmins, IT support and manual QA moving toward cloud, SRE, platform or DevOps work, with AI as your study partner.*

<div class="promo-box">
  <span class="promo-icon">🧭</span>
  <h3>The short version</h3>
  <p>You don't need Docker, Kubernetes, Terraform, pipelines, cloud and GenAI all at once. Nobody uses all of them every day. But you can't choose the path that fits you <b>until you've tried each one.</b> So spend the last 75 days of the year exploring, one skill a week, 30 minutes a day. Then pick, and go deep.</p>
  <p>Questions? <b>Write to me: <a href="mailto:dev.with.vijay@gmail.com?subject=75-Day%20Challenge">dev.with.vijay@gmail.com</a></b>. I read every email.</p>
</div>

## Why I'm writing this

I started my career on night shifts as a support engineer, taking customer calls and learning PowerShell between them. I didn't plan the road from there. I was reluctant about Kubernetes, and it became my favourite technology. When GenAI arrived, I started with "what is an LLM?" Today I work as a generative AI cloud architect in a large enterprise. Looking back, every big step began the same way: **I tried something before I knew whether it was for me.**

That's the idea behind this plan. Not a race to collect tools, but a tour, so you can choose your road.

## Who this is for (and who it isn't)

**For you if** you're a system administrator, IT support engineer, manual QA tester, NOC or operations engineer, or a junior developer drifting toward infrastructure. You run other people's scripts today, and you want to build and automate the systems yourself.

**Not for you if** you're a data scientist, outside IT altogether, or already working as a DevOps engineer. You'd find it too basic, and I'd rather tell you now.

And one honest promise: **nobody becomes an expert in 75 days.** What you *can* get is a real foundation, three projects you can show, and a clear idea of where to go deep next.

## Lesson 1: six tools, six questions

The DevOps toolchain looks less scary once you see that each tool answers exactly **one question**:

| Tool | The one question it answers |
|---|---|
| **Docker** | How do I package my app so it runs the same everywhere? |
| **Kubernetes** | How do I keep it running, healthy and scaled when something fails? |
| **Terraform** | How do I create servers, networks and databases the same way every time, from code? |
| **GitHub Actions** (CI/CD) | How do I stop doing build, test and deploy by hand? |
| **Azure** (or any cloud) | Where does all of this actually run, and who is allowed to touch it? |
| **AI assistants** | How do I learn and troubleshoot faster, without leaking secrets? |

**Try it:** take the last project you worked on (at work or in a course) and mark which of the six questions it already answers. The gaps are your learning list, in your order.

## Lesson 2: your scripts are closer to DevOps than you think

If you write PowerShell, Bash or Python to manage servers and users, you already do half of what DevOps engineers do. The missing half is usually **one idea: idempotency.** Running it twice should be as safe as running it once.

```powershell
# Not idempotent: the second run fails or creates a duplicate
New-ADUser -Name "jdoe" -SamAccountName "jdoe"

# Idempotent: describe the result you want, and check before you act
if (-not (Get-ADUser -Filter "SamAccountName -eq 'jdoe'")) {
    New-ADUser -Name "jdoe" -SamAccountName "jdoe"
}
```

The second version describes a **desired state** ("jdoe exists"). That's exactly how the big tools think:

- **Terraform** compares the infrastructure you declared with what exists, and `terraform plan` shows only the difference. Run `plan` right after `apply` and it says *no changes*. That's idempotency.
- **Kubernetes** keeps comparing your YAML ("3 copies of this app, each with 256 MB") with reality, and fixes the difference, all day, every day.
- Your **scheduled task** becomes a Kubernetes CronJob or a pipeline schedule. Your **"check before create"** becomes `terraform plan`.

**Try it:** pick one script you run at work and ask, *"What happens if I run it twice?"* If the answer is "errors" or "duplicates", add the check.

## The rules: built for people with a full-time job

- **30 minutes a day, 5 days a week.** One longer build session (about an hour) at the weekend. One day to catch up or rest.
- **Weekly goals, not daily punishment.** Missed three days? You're not out, and nobody restarts from Day 1. Finish the week's goal when you can.
- **Every week says who can skip it.** Already containerising apps at work? Skip Docker week. Honest skipping beats pretending.
- **AI is your study partner, not your answer machine.** Give it context, the exact command, the exact error and your goal, and ask *"explain why"* before *"fix it"*. **Never paste** passwords, keys, tokens, connection strings, customer data or internal hostnames. Replace them with `<REDACTED>` first.

## The 11-week map

| Week | Explore | Why it matters |
|---|---|---|
| 0 | Setup + "where am I today?" | A working laptop removes the #1 reason people quit in week 1 |
| 1 | Linux, Git, AI as a study partner | Every tool assumes a terminal and Git |
| 2 | Docker | How modern apps are packaged and shipped |
| 3 | Kubernetes I | Where most sizable modern apps run |
| 4 | Kubernetes II: production basics | The gap between "it runs" and "it's production-ready" |
| 5 | **Checkpoint 1** | A 2-tier app on Kubernetes, done properly |
| 6 | CI/CD with GitHub Actions | Automating delivery is the heart of DevOps |
| 7 | Cloud for admins (Azure) | Admin work is moving to the cloud |
| 8 | Terraform | Infrastructure created the same way every time |
| 9 | **Checkpoint 2** | Pipeline + Terraform + app, end to end |
| 10 | AI in DevOps and SRE | Troubleshoot faster, and run AI apps like any workload |
| 11 | **Capstone + pick your path** | Turn 75 days into a story, and choose where to go deep |

Everything runs **free** on your laptop: Docker, a local Kubernetes cluster (kind), and free GitHub Actions minutes. No cloud bill needed.

## How to know your level, honestly

We use three levels, and never the word "expert":

- **Starter:** I can follow along.
- **Working:** I can do it alone, with docs.
- **Intermediate:** I can decide *which* option fits, and explain why.

An example for Kubernetes: *can you deploy an app built from your own Dockerfile, and explain when you'd use a Job, a CronJob or a Deployment? Do you use a PersistentVolumeClaim comfortably?* If yes, you're intermediate. If not yet, that's what weeks 3–5 are for.

## Week 0: do this today

1. Install **Git**, **VS Code**, **Docker Desktop** (enable WSL 2 on Windows), **kubectl** and **kind**.
2. Create a free **GitHub** account and a free **ChatGPT** or **Claude** account.
3. Check that it all works:
   ```bash
   git --version
   docker run hello-world
   kind create cluster --name upgrade
   kubectl get nodes        # one node, STATUS Ready
   ```
4. Write one sentence: *"In 75 days I want to be able to ______ so that ______."*

If something fails, paste the **error** (never secrets) into your AI assistant and ask: *"I'm a beginner. Explain this error and how to fix it."* That's your first study-partner session.

## If you want company

I'm running this as the **75-Day Career Upgrade Challenge** (#75DayUpgrade), together with anyone who wants to join. Everything above is yours to use on your own. You don't need anything else.

If you'd like the extras, there's a **free kit**:
- a day-by-day tracker (Excel or Google Sheets)
- the PDF guide
- weekly hands-on lessons and three portfolio projects
- a short weekly email
- a live Q&A when enough questions come in

<div class="promo-box">
  <span class="promo-icon">📋</span>
  <h3>The free 75-Day Challenge Kit</h3>
  <p>Tracker, guide, weekly lessons and projects. Free, and optional.</p>
  <a href="https://www.readyforprod.cloud/products/digital_downloads/75-day-career-upgrade-challenge" class="btn btn-outline">📋 Get the free kit</a>
</div>

Whatever you decide, start with Week 0 today. Thirty minutes. The year isn't over yet.

**Write to me** with where you're starting from: [dev.with.vijay@gmail.com](mailto:dev.with.vijay@gmail.com?subject=75-Day%20Challenge). I'll answer the most common questions in the weekly live.

Vijay
