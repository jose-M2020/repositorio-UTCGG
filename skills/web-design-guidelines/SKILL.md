---
name: web-design-guidelines
description: Review UI code against Web Interface Guidelines and apply local component design standards from rules/*.md.
metadata:
  author: vercel
  version: "1.1.0"
  argument-hint: <file-or-pattern-or-component>
---

# Web Design Guidelines

Use this skill whenever the task involves:

- UI/UX review or accessibility checks
- Interface quality audits
- Designing or implementing reusable UI patterns
- Data table design decisions

This skill has two complementary paths:

1. External audit path: evaluate files using the latest Vercel Web Interface Guidelines.
2. Local rule path: apply focused component guidelines from `rules/*.md`.

## How to apply

1. Identify whether the request is an audit, an implementation design, or both.
2. If an audit is requested, fetch Vercel guidelines and review target files.
3. Map the task to one or more local rule files and read them before editing.
4. Apply the smallest coherent changes that satisfy accessibility, clarity, and consistency.
5. Report findings or decisions with concrete file references.

## Rule Index

| Concern | Read |
| --- | --- |
| Enterprise data table design, behavior, states, accessibility, and responsive strategy | [`rules/data-table.md`](rules/data-table.md) |

## External audit workflow (Vercel)

Review files for compliance with Web Interface Guidelines.

1. Fetch the latest guidelines from the source URL below.
2. Read the specified files (or prompt user for files/pattern).
3. Check against all rules in the fetched guidelines.
4. Output findings in the terse `file:line` format.

### Guidelines source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all rules and output format instructions.

### Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above.
2. Read the specified files.
3. Apply all rules from the fetched guidelines.
4. Output findings using the format specified in the guidelines.

If no files are specified, ask the user which files to review.
