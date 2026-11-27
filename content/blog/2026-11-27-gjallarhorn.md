---
title: "Gjallarhorn: which images to update first"
date: 2026-11-27
summary: "A small dashboard over the Trivy Operator reports in my homelab. It tells me which few images to update first."
---

CVEs are coming in faster than ever. 100,009 were published this year by mid-November, [2.1 times all of 2025](https://blackkite.com/reports/100k-cve-report-2026), and a good part of that jump is AI finding bugs. Claude models alone have [reported 5,087 vulnerabilities](https://red.anthropic.com/2026/cvd/) in 680 open source projects, and only 629 of them are patched so far.

My homelab runs about 130 images written by other people. So even at home, "I will update it someday" does not work anymore.

## How it started

Until recently I used kubescape for that. It kept its scan results in its own storage, and one Sunday that storage got stuck: ArgoCD could not list one of its resources in 60 seconds, and all 76 of my applications turned Unknown until I restarted the pod. A security scanner that takes down my GitOps. Enough.

So on Thursday I switched to the [Trivy Operator](https://github.com/aquasecurity/trivy-operator). It writes plain reports as Kubernetes resources, right next to each workload, and in ArgoCD they show up under every app.

And then I looked at the numbers. Thousands of CVEs, a lot of red in ArgoCD, and a Grafana dashboard telling me how many. What I wanted to know is much simpler: what do I update first?

I also wanted it to look really nice. A dashboard for one question in one homelab is the kind of thing nobody would build a few years ago, it was never worth the time. With AI it is one evening, so that same night I wrote [Gjallarhorn](https://github.com/DiverOfDark/gjallarhorn).

The name is from Norse mythology: Gjallarhorn is the horn Heimdall blows to warn the gods that Ragnarök is coming. My status page is already called Hugin, after one of Odin's ravens, so the theme stuck 😅

![Gjallarhorn overview: "Five images carry 100 of your 218 critical vulnerabilities", all five are Harbor 2.15.4 images, with 1,454 distinct CVEs across 137 images below](/img/blog/gjallarhorn-1.jpg)

## How it works

The first page answers exactly that question: which five images hold most of the critical CVEs. Update those, and almost half of the critical findings are gone.

Then for every image it shows packages and the one version to update to. Trivy reports every CVE separately, so one old curl turns into a long list. Gjallarhorn groups them: in harbor-core, one curl update from 8.22 to 8.23 clears all 20 critical findings.

![Gjallarhorn page for goharbor/harbor-core:v2.15.4: 20 critical, 50 high, and a table of packages with the installed version and the version to update to, curl first](/img/blog/gjallarhorn-2.jpg)

There is more around it: CVEs across the whole cluster, misconfigurations, RBAC risks, secrets baked into images and compliance. All of it is in the [docs](https://diverofdark.github.io/gjallarhorn/).

## The fun parts

**Not rated.** The newest CVEs often have no severity yet. I have 3,775 findings like that, and in the charts they would drown everything else, so they are counted separately.

**Secrets.** Trivy also finds secrets left in image layers. Gjallarhorn shows where they are, but never reads or shows the secret itself.

**Irony, twice.** While picking the Trivy version, I found out that Trivy 0.69.4 was itself malicious ([CVE-2026-33634](https://www.cve.org/CVERecord?id=CVE-2026-33634)), so mine is pinned to a later, clean one. And today the most vulnerable image in my cluster is Harbor's own Trivy adapter 😅

**The plan.** When I wrote the first version, five images carried 63 of my 111 critical CVEs, and the plan was to update them over the weekend. Spoiler: a week later four of them are still there. Harbor just overtook them.

## What is inside

- Rust, one small binary, read-only access to the Trivy reports and nothing else;
- a Svelte frontend inside that binary, dark theme and a phone layout;
- a Helm chart and docs, and it is built by [GitImage](/blog/2026-11-22-gitimage) like the rest of my projects.

There is no login, so keep it on a private network. Mine is only reachable from home, and my setup is in the [homelab repo](https://github.com/DiverOfDark/homelab/blob/master/k3s-apps/gjallarhorn.yaml).

[github.com/DiverOfDark/gjallarhorn](https://github.com/DiverOfDark/gjallarhorn)
