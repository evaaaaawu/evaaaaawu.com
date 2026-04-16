#!/usr/bin/env bash
set -euo pipefail

# Fetch the private content repo into ./content/.
#
# - Local development: relies on your existing GitHub credentials (SSH key or
#   gh CLI credential helper). Run this once; subsequent runs do a fast pull.
# - CI (Cloudflare Pages): set CONTENT_REPO_TOKEN to a fine-grained PAT with
#   read access to evaaaaawu/evaaaaawu-content. This script will use it to
#   build an HTTPS URL with an embedded token.

REPO_SLUG="${CONTENT_REPO_SLUG:-evaaaaawu/evaaaaawu-content}"
TARGET_DIR="content"

if [[ -n "${CONTENT_REPO_TOKEN:-}" ]]; then
  REMOTE_URL="https://x-access-token:${CONTENT_REPO_TOKEN}@github.com/${REPO_SLUG}.git"
else
  REMOTE_URL="https://github.com/${REPO_SLUG}.git"
fi

if [[ -d "${TARGET_DIR}/.git" ]]; then
  echo "Updating existing ${TARGET_DIR}/ ..."
  git -C "${TARGET_DIR}" fetch --depth=1 origin main
  git -C "${TARGET_DIR}" reset --hard origin/main
else
  echo "Cloning ${REPO_SLUG} into ${TARGET_DIR}/ ..."
  rm -rf "${TARGET_DIR}"
  git clone --depth=1 "${REMOTE_URL}" "${TARGET_DIR}"
fi

echo "Done."
