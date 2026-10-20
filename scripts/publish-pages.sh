#!/usr/bin/env bash
# Publishes a built site into a folder of the gh-pages branch.
#
# Usage: publish-pages.sh <target-dir> [source-dir]
#   target-dir  "." for the main site (keeps preview/), or e.g. "preview/my-branch".
#   source-dir  Build output to publish. Omit it to delete target-dir instead.
#
# Requires GITHUB_TOKEN, GITHUB_REPOSITORY and GITHUB_SHA (set by GitHub Actions).
set -euo pipefail

target="$1"
source="${2:-}"
if [ -n "$source" ]; then
  source="$(cd "$source" && pwd)"
fi

work="$(mktemp -d)"
remote="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

if git ls-remote --exit-code --heads "$remote" gh-pages >/dev/null 2>&1; then
  git clone --quiet --depth 1 --branch gh-pages "$remote" "$work"
else
  git init --quiet -b gh-pages "$work"
  git -C "$work" remote add origin "$remote"
fi

if [ "$target" = "." ]; then
  find "$work" -mindepth 1 -maxdepth 1 ! -name .git ! -name preview -exec rm -rf {} +
else
  rm -rf "${work:?}/${target}"
fi

if [ -n "$source" ]; then
  mkdir -p "$work/$target"
  cp -R "$source"/. "$work/$target"/
fi

# Serve files as-is; Jekyll would hide Astro's _astro/ folder.
touch "$work/.nojekyll"

cd "$work"
git add -A
if git diff --cached --quiet; then
  echo "Nothing to publish."
  exit 0
fi
git -c user.name="github-actions[bot]" \
    -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
    commit --quiet -m "Publish ${target} from ${GITHUB_SHA}"
git push --quiet origin gh-pages
