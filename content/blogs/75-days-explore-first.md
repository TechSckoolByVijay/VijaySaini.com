---
title: "75 Days Left This Year: Explore First, Specialise Later"
date: 2026-10-14
author: Vijay Saini
tags: Career, DevOps, Kubernetes, Cloud, SRE, Learning Plan
---

# 75 Days Left This Year: Explore First, Specialise Later

*About 75 days are left in this year. Let's use them to give our careers a well-deserved upgrade in this AI era: 30 minutes a day, for sysadmins, IT support and manual QA moving toward cloud, SRE, platform or DevOps work.*

<div class="promo-box">
  <span class="promo-icon">🧭</span>
  <h3>The short version</h3>
  <p>You don't need Docker, Kubernetes, Terraform, pipelines, cloud and GenAI all at once. Nobody uses all of them every day. But you can't choose your path <b>until you've tried each one.</b> So spend the rest of the year exploring, one skill a week. Then pick, and go deep.</p>
</div>

I started my career on night shifts as a support engineer, learning PowerShell between customer calls. Today I work as a generative AI cloud architect in a large enterprise. Every big step began the same way: **I tried something before I knew whether it was for me.** This plan is that idea, made into 75 days.

**It's for you if** you're a sysadmin, IT support engineer, manual QA tester, NOC engineer or junior developer, and you want to build and automate systems, not just run other people's scripts. **It's not for** data scientists or working DevOps engineers. And nobody becomes an expert in 75 days. What you *can* get is a real foundation, three projects you can show, and a clear next step.

<div class="promo-box">
  <span class="promo-icon">📋</span>
  <h3>Join the challenge: get the free kit</h3>
  <p>A day-by-day tracker (Excel or Google Sheets), the PDF guide, weekly hands-on lessons, three portfolio projects, and a short weekly email. Free.</p>
  <a href="https://www.readyforprod.cloud/products/digital_downloads/75-day-career-upgrade-challenge" class="btn btn-outline">📋 Get the free kit</a>
</div>

<div class="promo-box">
  <span class="promo-icon">✉️</span>
  <h3>Not sure yet? Write to me</h3>
  <p>Tell me where you're starting from and I'll reply personally: <b><a href="mailto:dev.with.vijay@gmail.com?subject=75-Day%20Challenge">dev.with.vijay@gmail.com</a></b>. I read every email.</p>
</div>

## Lesson 1: six tools, six questions

Each tool answers exactly **one question**:

| Tool | The one question it answers |
|---|---|
| **Docker** | How do I package my app so it runs the same everywhere? |
| **Kubernetes** | How do I keep it running and healthy when something fails? |
| **Terraform** | How do I create infrastructure the same way every time, from code? |
| **GitHub Actions** | How do I stop building, testing and deploying by hand? |
| **Azure** (or any cloud) | Where does it all run, and who is allowed to touch it? |
| **AI assistants** | How do I learn and troubleshoot faster, without leaking secrets? |

**Try it:** mark which questions your current project already answers. The gaps are your learning list.

## Lesson 2: run it twice

Ask about any script you run: *"What happens if I run it twice?"*

```powershell
# Run twice: error or duplicate
New-ADUser -Name "jdoe" -SamAccountName "jdoe"

# Run twice: safe
if (-not (Get-ADUser -Filter "SamAccountName -eq 'jdoe'")) {
    New-ADUser -Name "jdoe" -SamAccountName "jdoe"
}
```

The second one describes the result you want and checks before acting. That's **idempotency**, and it's how Terraform and Kubernetes work: declare what should exist, change only the difference.

## The 11-week map

| Week | Explore |
|---|---|
| 0 | Setup + "where am I today?" |
| 1 | Linux, Git, AI as a study partner |
| 2 | Docker |
| 3–4 | Kubernetes, then production basics |
| 5 | **Checkpoint 1:** an app on Kubernetes, done properly |
| 6 | CI/CD with GitHub Actions |
| 7 | Cloud for admins (Azure) |
| 8 | Terraform |
| 9 | **Checkpoint 2:** pipeline + Terraform + app, end to end |
| 10 | AI in DevOps and SRE |
| 11 | **Capstone** + pick your path |

**The rules:** 30 minutes a day, one longer session at the weekend, one rest day. Weekly goals, not daily punishment: miss a few days and you're still in. Each week says who can skip it. Everything runs free on your laptop.

## Week 0: do this today

1. Install **Git**, **VS Code**, **Docker Desktop**, **kubectl** and **kind**, and create free **GitHub** and **ChatGPT** or **Claude** accounts.
2. Check it works:
   ```bash
   docker run hello-world
   kind create cluster --name upgrade
   kubectl get nodes        # one node, STATUS Ready
   ```
3. Write one sentence: *"In 75 days I want to be able to ______ so that ______."*

Stuck? Paste the **error** (never passwords or keys) into your AI assistant and ask it to explain. That's your first study-partner session.

Thirty minutes today. The year isn't over yet. **[Get the free kit](https://www.readyforprod.cloud/products/digital_downloads/75-day-career-upgrade-challenge)** or **[write to me](mailto:dev.with.vijay@gmail.com?subject=75-Day%20Challenge)**.

Vijay
