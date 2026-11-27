Announcements for "Gjallarhorn: which images to update first".

## telegram
[Новый пост в блоге](https://kirillorlov.pro/blog/2026-11-27-gjallarhorn) (на английском) 🛡️

CVE в этом году прут как никогда: уже больше 100 тысяч, в два с лишним раза больше, чем за весь 2025. Во многом это AI, который научился находить баги пачками. Так что даже в хомлабе забить на апдейты уже не вариант.

У меня kubescape однажды положил весь ArgoCD, и я переехал на Trivy Operator. А чтобы не тонуть в тысячах CVE, в ту же ночь написал Gjallarhorn: красивый дашборд, который отвечает на один вопрос, какие образы обновлять первыми.

Самое смешное: самый дырявый образ в моём кластере сейчас это Trivy-адаптер самого Harbor 😅

[Код на GitHub](https://github.com/DiverOfDark/gjallarhorn)

А вы как разгребаете CVE у себя? Обновляете всё подряд или есть система, что чинить первым?

## linkedin
CVEs are coming in faster than ever: over 100,000 published this year, 2.1 times all of 2025, and AI finding bugs at scale is a big part of it. Even in a homelab, "I'll update it someday" doesn't work anymore.

After kubescape took down my ArgoCD one Sunday, I moved to the Trivy Operator. Then I looked at thousands of CVEs and wanted an answer to one question: which images do I update first?

So I built Gjallarhorn, a small dashboard over the Trivy reports. Its first page names the five images holding most of the critical CVEs, and for every image it shows the one package version that clears them. A few years ago a tool this niche, for one homelab, would never have been worth building. With AI it took one evening.

The best part: the most vulnerable image in my cluster right now is Harbor's own Trivy adapter.

More details on my website: https://kirillorlov.pro/blog/2026-11-27-gjallarhorn
Code: https://github.com/DiverOfDark/gjallarhorn

How do you deal with CVEs in your own setup? Patch everything, or do you have a system for what goes first?
