---
name: commit-message
description: Writes a conventional commit message from your staged changes. Analyzes the diff, picks the right type and scope, and writes a clear concise message ready to commit. Invoke when you have staged changes ready.
allowed-tools: Bash
---

# Commit Message Writer

Write a conventional commit message for the currently staged changes.

## Step 1 — Check staged changes

```bash
git diff --staged
git diff --staged --name-only
```

If there are no staged changes, stop and tell the developer. Suggest running `git add <files>` first.

## Step 2 — Check the project's commit style

```bash
git log --oneline -15
```

Note:

- Does the project use Conventional Commits? (`feat:`, `fix:`, `chore:`, etc.)
- Does it include a scope? (`feat(auth):`)
- What's the typical subject line length and tone?

Default to Conventional Commits unless the project clearly uses a different format.

## Step 3 — Write the commit message

**Format:**

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Choose the right type:**
| Type | When to use |
|------|------------|
| `feat` | A new feature or capability |
| `fix` | A bug fix |
| `refactor` | Code restructuring with no behavior change |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `chore` | Build config, deps, tooling |
| `perf` | Performance improvement |
| `style` | Formatting, whitespace, missing semicolons |
| `ci` | CI/CD configuration |

**Subject line rules:**

- Max 72 characters
- Imperative mood: "add" not "added", "fix" not "fixed"
- No period at the end
- Lowercase after the colon

**Body** (only when the "why" is not obvious from the subject):

- Explain motivation, not mechanics
- Wrap at 72 characters
- Separate from subject with a blank line
- write in Korean

**Footer:**

- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: <description>`

## Step 4 — Commit

Show the message to the developer. Once approved:

```bash
# Single-line message:
git commit -m "<type>(<scope>): <subject>"

# With body or footer:
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

<footer>
EOF
)"
```
