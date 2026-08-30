# Setup — Cloudflare Web Analytics + visitor mini map

One service: Cloudflare Web Analytics. Free, cookieless, no consent banner
needed, and free accounts can use the GraphQL API that feeds the map.

## Files

```
.github/workflows/update-stats.yml   new
assets/minimap.js                    new
assets/style.css                     modified (map CSS appended)
index.html publications.html talks.html
teaching.html software.html cv.html  modified
data/countries.json                  created by the workflow, don't hand-edit
```

Delete these leftovers from your repo root if still present:
`analytics.js`, `minimap.js`, `minimap.css`, `update-stats.yml`.
Also delete `assets/analytics.js` — it was for Umami and is no longer used.

The beacon token `8b1f8b49b50f4f959223014de40c4cde` is already filled in on
all six pages. Nothing to edit in the HTML.

---

## 1. Values you need

**Account ID** — the hex string in the dashboard URL:
`dash.cloudflare.com/<ACCOUNT_ID>/...`

**API token** — profile icon (top right) -> My Profile -> API Tokens ->
Create Token -> Create Custom Token (at the bottom).
  - Permissions: `Account` -> `Analytics` -> `Read`
  - Account Resources: include your account

  Do not use the Global API Key; it has full account access.

**Site tag** — not the same as the beacon token. Get it with:

```
curl -s "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rum/site_info/list" \
  -H "Authorization: Bearer <API_TOKEN>" | jq '.result[] | {site_tag, site_token}'
```

Match the entry whose `site_token` is `8b1f8b49b50f4f959223014de40c4cde`;
its `site_tag` is what you want. A 403 here means the token permissions are
wrong.

## 2. GitHub secrets

Settings -> Secrets and variables -> Actions -> **Secrets** tab:

| Name | Value |
|---|---|
| `CF_API_TOKEN` | the custom token |
| `CF_ACCOUNT_ID` | the hex string from the URL |
| `CF_SITE_TAG` | from the curl above |

## 3. Workflow permissions

Settings -> Actions -> General -> Workflow permissions ->
**Read and write permissions**. The job commits `data/countries.json` back to
the repo and fails on its last step without this.

## 4. Optional map toggle

Same settings page, **Variables** tab:

| Name | Values | Default |
|---|---|---|
| `SHOW_VISITOR_MAP` | `off` / `auto` / `on` | `auto` |
| `MAP_MIN_VISITS` | number | `250` |

`auto` reveals the map once 30-day visits reach the threshold. Lower
`MAP_MIN_VISITS` if you don't want to wait.

## 5. First run

Actions tab -> Update visitor stats -> Run workflow. Expand
"Fetch country metrics". It prints:

```
visits: 0 | countries: 0 | mode: auto | visible: false
top codes:
```

Zero is expected at first. That it printed means the token works.

---

## Checking the country codes

`minimap.js` expects two-letter ISO codes (`FR`, `US`). Cloudflare's
`countryName` dimension should return those despite the field name. The
workflow prints a `top codes:` line each run so you can confirm once real
data arrives. If it shows full names like `France`, `minimap.js` needs a
one-line change.

## Notes

- No DNS change needed. The beacon works on any site.
- Free-plan retention is ~30 days, matching the query window.
- Bots are excluded via the `bot: 0` filter; `T1` (Tor) and blanks are dropped.
- `data/countries.json` is public: country codes and counts only.
- Ad blockers suppress some hits, so numbers undercount.
- Click/download tracking is not included — Cloudflare Web Analytics has no
  custom-event API. It was dropped along with Umami.
