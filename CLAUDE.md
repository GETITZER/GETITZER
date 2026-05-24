# CLAUDE.md

This file provides context for AI assistants working in this repository.

## Repository Overview

This is a **GitHub profile repository** (`GETITZER/GETITZER`). GitHub treats this as a special repository: the `README.md` at the root is automatically displayed on the public GitHub profile page at `github.com/GETITZER`.

There is no application code, build system, test suite, or deployment pipeline — the sole content is the profile README.

## Repository Structure

```
GETITZER/
└── README.md   # GitHub profile page (rendered on github.com/GETITZER)
```

## README.md Conventions

- The file uses standard GitHub Flavored Markdown (GFM).
- Emojis are present in the existing template and are expected here since GitHub renders them in profile READMEs.
- HTML comments (`<!-- -->`) inside the file are not rendered on the profile page and can be used for notes.
- Keep changes concise — profile READMEs display best when they are scannable and to the point.

## Development Workflow

Since there is no code, there is no build, test, or lint step. The only workflow is:

1. Edit `README.md`.
2. Commit and push to `main`.
3. Changes appear live on the GitHub profile immediately after the push lands.

When asked to make changes, edit `README.md` directly, commit, and push to `main` (or open a PR to `main` if working on a feature branch).

## Branching

- `main` — the production branch; its `README.md` is what GitHub displays on the profile.
- Feature branches (e.g. `claude/...`) are used for proposed changes before merging to `main`.

## Key Constraints

- Do not add application code, `package.json`, CI workflows, or other tooling unless the owner explicitly requests it.
- Do not create additional Markdown files unless requested; the profile README is intentionally a single file.
- Preserve the HTML comment block at the bottom of `README.md` — it is part of the GitHub template and serves as a reminder about the special nature of the repository.
