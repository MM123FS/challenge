# DevOps Platform Challenge — Starter

This is the intentionally defective starter repository.

Run locally:

```bash
npm install
npm test
npm start
```

The application listens on port 3000.

**Important:** the repository is intentionally incomplete from a DevOps-platform perspective. Students must implement the GitHub workflow, CI/CD, Docker registry publishing, Terraform validation, documentation, and quality gates described in the challenge brief.

## Branching strategy

- `main` — protected branch, always deployable. No direct commits.
- `feature/...` — new functionality (e.g. `feature/task-listing`, `feature/delete-task`)
- `fix/...` — bug fixes (e.g. `fix/failing-test`)
- `chore/...` — maintenance, config, tooling (e.g. `chore/add-node-ci`)

Every branch is created from an up-to-date `main`, tied to one GitHub Issue,
and merged via Pull Request after review and a passing CI check.

Commit messages are short and descriptive (e.g. `Add task status validation`),
not generic (`update`, `fix`, `final`).
