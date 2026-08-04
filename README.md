# cute aggression

Astro static site. Deployed to Uberspace automatically on every push to `main`.

## Updating the site

Everything you'd normally want to change lives in `src/data/*.yaml`. Edit those on
github.com (pencil icon → commit), and the site rebuilds and goes live in about a minute.
No terminal needed.

| File                     | What it is                                               |
| ------------------------ | -------------------------------------------------------- |
| `src/data/news.yaml`     | gigs and release announcements, newest sorts first        |
| `src/data/releases.yaml` | music, rendered as Spotify/Bandcamp players               |
| `src/data/videos.yaml`   | music videos, just paste the YouTube link                 |
| `src/data/links.yaml`    | social links — shown on `/` and on the linktree `/links`  |

Each file has a comment at the top showing the format. Two rules that bite:

- every entry needs a **unique `id`**, otherwise entries silently overwrite each other
- dates are `YYYY-MM-DD`. `dateLabel:` overrides what's _displayed_ if you want a joke there

If you get the format wrong the deploy fails loudly instead of publishing a broken page —
check the Actions tab for what it didn't like.

The bio text is in `src/pages/index.astro`.

## Linktree

`/links` is the single-link page for instagram bios. It's generated from `links.yaml`
(`featured: true` = big button) and automatically puts the newest entry from
`releases.yaml` at the top.

## Local development

```sh
pnpm install
pnpm dev       # localhost:4321
pnpm build     # typecheck + build into dist/
pnpm test      # checks the spotify/youtube/bandcamp link parsing
```

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and rsyncs `dist/` to
`/var/www/virtual/$SSH_USER/html/` on Uberspace. `dist/` is not in git.

Required repository secrets (Settings → Secrets and variables → Actions):

| Secret            | How to get it                                      |
| ----------------- | -------------------------------------------------- |
| `SSH_HOST`        | your uberspace host, e.g. `andromeda.uberspace.de` |
| `SSH_USER`        | your uberspace username                            |
| `SSH_KEY`         | private half of a deploy-only keypair (see below)  |
| `SSH_KNOWN_HOSTS` | output of `ssh-keyscan <SSH_HOST>`                 |

One-time key setup, run locally:

```sh
ssh-keygen -t ed25519 -N "" -f ~/.ssh/cuteaggression_deploy -C "github-actions deploy"
ssh-copy-id -i ~/.ssh/cuteaggression_deploy.pub <user>@<host>
ssh-keyscan <host>                        # -> SSH_KNOWN_HOSTS
cat ~/.ssh/cuteaggression_deploy          # -> SSH_KEY, the whole thing incl. BEGIN/END lines
```

The rsync runs with `--delete`: anything in `html/` that isn't in `dist/` gets removed.
Check what's in there before the first deploy.
