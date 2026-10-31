# ADR 0003: Git LFS for Design Screenshots

## Status

Accepted — 31 October 2026.

## Context

The repository contains 143 HTML mockups and 142 screenshots. The screenshots
total roughly 84 MB. Committing them as regular Git blobs would make clones slow
and repository growth difficult to manage.

## Decision

Track `design/mockups/**/screen.png` with Git LFS. Keep the HTML mockups as
regular Git files because they are small and benefit from normal diffs.

## Consequences

- Contributors must run `git lfs install` before cloning or checking out.
- GitHub provides LFS storage and bandwidth quotas; monitor usage.
- CI does not fetch LFS assets because the build does not need them.
- Mockup folder names are stable IDs and must not be renamed.
