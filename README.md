# tanvir.sh

Personal profile site. Astro static output, deployed to Cloudflare Workers with
static assets.

```
npm run dev       # astro dev, localhost:4321
npm run build     # -> dist/
npm run preview   # build + wrangler dev, localhost:8787 (needed to test curl)
npm run deploy    # build + wrangler deploy
```

`npm run dev` will not exercise the curl behaviour — that lives in the Worker, so
use `npm run preview` for it.

## Where the content comes from

Career data is derived from the `master.yaml` in my resume generator, which is
that side's source of truth. When one changes, the other needs the same change. The site deliberately follows master.yaml's writing rules: no internal
product names, repo names or ticket IDs, because a recruiter has never heard of
them.

The numbers on the homepage were verified against the GitHub search API on
2026-09-16:

```
gh search prs --author TanvirSingh007 --owner trilogy-group
gh search issues --author TanvirSingh007 --owner trilogy-group
```

Re-run those before changing them.

## How it fits together

`src/data/profile.ts` is the single source of truth. The pages, the `curl`
output, the JSON-LD and the OG images all read from it, so there is no second
copy to keep in sync.

Case studies are an Astro content collection. `order` controls sort position and
`featured` puts an entry on the homepage — both are frontmatter, so you can
re-order the work section per application without touching a component.

`worker/index.ts` serves a plaintext card to terminal user-agents and falls
through to static assets for everyone else.

## Two things not to change casually

**`run_worker_first` in `wrangler.jsonc` is scoped to `["/"]` on purpose.**
Static asset requests are free and unlimited; anything matching
`run_worker_first` invokes the Worker and is billed as a Worker request. Past
free-tier limits those paths return 429 rather than falling back to the static
file, so widening this to `true` would put the whole site behind that behaviour
instead of just the homepage.

**`public/robots.txt` is load-bearing.** Cloudflare serves its own Content
Signals Policy (`ai-train=no`) to free-plan domains that ship no robots.txt of
their own. Deleting this file silently opts the site out of exactly the crawlers
it is trying to reach.

## Deploying

1. Add `tanvir.sh` to Cloudflare and point the registrar at the Cloudflare
   nameservers. Nothing else works until this propagates.
2. In the zone, check Security → Configure AI bot policies. New domains created
   after 15 September 2026 get new defaults; confirm Search, Agent and Training
   all read Allow.
3. Connect the repo in Workers Builds, or run `npm run deploy` by hand. The
   Worker name in the dashboard must match `name` in `wrangler.jsonc` or the
   build fails.
4. After the first deploy, fetch `https://tanvir.sh/robots.txt` and confirm you
   get the file from this repo rather than Cloudflare's injected policy.

## Checks worth running after a change

```
npm run build && npm run check:commands  # every printed command resolves
npx serve dist                           # read every page with JS disabled
curl -A "curl/8.7.1" localhost:8787      # plaintext card
curl -A "Mozilla/5.0" localhost:8787     # html
```

`check:commands` exists because the pages use shell commands as section headers
(`cat stack.txt`). If one of those is not registered in the `targets` table in
`src/components/CommandBar.astro`, someone who types what they just read gets
"no such file or directory". Run it after adding a section.

Lighthouse on mobile emulation, then on a real phone. The two disagree more than
they should.
