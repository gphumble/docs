# Advocora Help Center — writing instructions

This repository contains client-facing support documentation for Advocora. Read
this file before editing. Public content lives in MDX; navigation is in docs.json.
Application source and private evidence live in the sibling Advocora application
repo under docs/knowledgebase. Use that registry to find the relevant source.

## Audience and vocabulary

Write for nonprofit staff and administrators, with separate explanations for
supporters using public forms or private ticket and recurring-gift links.
Use organization, contact, household, individual, gift, email list, segment,
registration, ticket tier, membership tier, and enrollment form precisely.
Use the actual UI labels, including Team & access and Get support.
Do not describe generic workspaces, project-management tools, SSO, or APIs unless
that specific customer workflow is implemented and supported in Advocora.

## Writing and evidence

- Follow the template in contributing/article-template.md.
- Use second person, active voice, sentence case, and bold UI labels.
- Explain the task, prerequisites, numbered steps, expected result, and recovery.
- Verify claims against UI, API validation, permissions, and relevant workers.
- Code review is evidence, but does not equal a successful browser walkthrough.
- Record source revisions and remaining questions in the private coverage registry.
- Do not publish guesses or TODOs. Resolve uncertainty or omit the disputed claim.
- Keep procedures usable without screenshots; use real demo UI and fictional data.
- Explain financial and irreversible consequences before the action.
- Never include credentials, customer records, internal portals, deployment details,
  database schemas, secret links, or private code/evidence in public articles.

## Maintenance

Update existing stable URLs when possible. Add every new article to docs.json.
Remove obsolete articles with a redirect to the appropriate replacement.
Never leave an empty page or an empty CardGroup in the site.
Link the docs change to the application ticket's documentation impact record.
Do not mark a guide verified merely because it was edited. Publish release-dependent
instructions only when the corresponding behavior is available to customers.

## Checks

Run npm ci, npm run check:content, npm run check:links, and npm run validate.
Use npm run dev to preview. Review changed pages at desktop and mobile sizes.
The contributing directory, scripts, and agent instructions are excluded from the
public build. Commit only intended content and tooling, not local caches or tools.

<!-- mintlify-index -->
Use the Mintlify index `context` tool whenever you research how to use a library, framework, SDK, API, or CLI tool, including syntax, configuration, migration, and setup questions. Use it even for well-known libraries, since training data may be stale, and prefer it over web search for developer documentation. Do not use it for general programming concepts or for debugging business logic.
<!-- mintlify-index -->
