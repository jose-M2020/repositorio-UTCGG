---
name: enterprise-data-table-design
version: "1.0.0"
description: Design and implement professional, accessible, scalable enterprise data tables using established UX principles and interaction patterns.
---

# Enterprise Data Table Design

## 1. Role

Act as a senior product designer, UX/UI engineer, and frontend architect for enterprise applications.

Design and implement high-quality data tables based on usability principles, accessibility standards, and proven interaction patterns.

Think like a product designer before thinking like a frontend developer.

Do not generate generic CRUD tables. Do not assume every table needs the same features. Do not prioritize implementation convenience over UX quality.

## 2. Design philosophy

Every data table must satisfy these principles:

### 2.1 Purpose-driven design
- Understand what users need to find.
- Identify decisions and tasks the table supports.
- Prioritize information by business relevance.
- Include only meaningful columns.
- Do not display data only because it exists in the database.

### 2.2 Information hierarchy
- Make important information immediately recognizable.
- Keep primary identifiers visually prominent.
- Reduce emphasis on secondary information.
- Make statuses easy to identify.
- Keep actions discoverable without dominating.

### 2.3 Cognitive load reduction
- Avoid unnecessary visual elements.
- Group related information logically.
- Keep formatting consistent (dates, currencies, numbers, statuses).
- Avoid excessive badges, icons, colors, and decorative cards.
- Prefer recognition over recall.

### 2.4 Consistency
- Reuse established design-system components.
- Keep spacing, typography, row heights, and interactions consistent.
- Apply the same behavior across similar tables.
- Do not invent new interaction patterns when an established one works.

### 2.5 Progressive disclosure
- Show essential information by default.
- Reveal secondary information on demand.
- Use expandable rows, contextual menus, drawers, or detail pages when useful.
- Avoid showing every action and every attribute at once.

## 3. First decision: identify table type

Do not assume all tables are identical. Identify the dominant purpose:

### Type A: Operational table
Examples: users, customers, employees, products, orders, transactions.

Priorities:
- Search
- Filtering
- Sorting
- Row actions
- Record identification
- Status visibility
- Pagination

### Type B: Analytical table
Examples: financial reports, performance, revenue breakdown, operational metrics.

Priorities:
- Numeric alignment
- Comparison
- Grouping
- Totals
- Date ranges
- Formatting

### Type C: Transactional table
Examples: payments, transfers, invoices, account movements.

Priorities:
- Dates
- References
- Monetary values
- Status
- Traceability
- Detailed inspection

### Type D: Configuration table
Examples: roles, permissions, categories, system parameters.

Priorities:
- Clear identification
- Configuration state
- Editing
- Contextual actions
- Relationship visibility

A table can combine types; choose the dominant one and adapt.

## 4. Table anatomy

A standard enterprise table can include these optional sections. Do not include all by default.

### 4.1 Table header
Contains:
- Title
- Optional description
- Optional total record count
- Optional primary action

Guidelines:
- Use a concise, descriptive title.
- Ensure title explains what the user is viewing.
- Use description for context, not repetition.
- Place primary action where it is easy to discover.
- Avoid unnecessary stats cards above simple tables.

### 4.2 Toolbar
Possible elements:
- Search
- Filters
- Saved views
- Column visibility
- Export
- Refresh
- Bulk actions
- View configuration

Guidelines:
- Prioritize frequent controls.
- Keep related controls together.
- Avoid exposing every option simultaneously.
- Use overflow for secondary actions.
- Avoid toolbar clutter.
- Separate global actions from row actions.

### 4.3 Header row
- Use clear column names.
- Keep terminology concise and understandable.
- Enable sorting only when meaningful.
- Keep alignment consistent with cells.
- Keep headers visually distinct from data rows.

Avoid:
- Ambiguous abbreviations.
- Unexplained technical field names.
- Decorative non-functional icons.
- Making every column sortable by default.

### 4.4 Body
- Each row should represent one logical record.
- Keep related info in the same row.
- Use consistent formatting.
- Make key identifiers easy to recognize.
- Avoid excessively tall rows.
- Use truncation only when useful and provide access to full content.

Use hover feedback to improve scanning.

Do not make entire rows clickable when the row has multiple independent controls and behavior becomes ambiguous.

### 4.5 Pagination
Common elements:
- Current page
- Previous/next
- Items per page
- Total records
- Page navigation

Guidelines:
- Use pagination for large datasets.
- Preserve current page after non-destructive updates when possible.
- Reset page when filters/search invalidate current page.
- Communicate record count.
- Avoid pagination for small bounded datasets.
- For server-side interactions, preserve query state during page changes.

## 5. Column design

Before defining columns ask:
1. What identifies each record?
2. What helps users decide?
3. What is frequently consulted?
4. What can move to detail view?
5. Which columns are redundant?

### 5.1 Priority
- Primary columns: core identification/understanding.
- Secondary columns: contextual support.
- Operational columns: status, amounts, ownership, actions.

Do not assign equal visual weight to all columns.

### 5.2 Alignment
Recommended:
- Names/descriptions: left
- Text IDs/email: left
- Currency/numbers: right
- Dates: consistent
- Status badges: consistent
- Checkboxes: center
- Actions: right

Do not center-align everything for symmetry.

### 5.3 Width
- Allocate width by importance and content shape.
- Avoid excessive empty space.
- Avoid truncating key identifiers unnecessarily.
- Use constrained widths for predictable values.
- Use flexible widths for descriptive fields.
- Keep action columns compact.

### 5.4 Truncation
- Use when density matters.
- Never truncate critical identifiers without recovery path.
- Provide tooltip or detail view when needed.
- Preserve accessible names and full values.
- Do not truncate everything by default.

## 6. Search, filtering, and sorting

These are independent capabilities. Add each one only with user-value justification.

### 6.1 Search
Use when users need to find known values (name, email, reference, ID).

Guidelines:
- Clear placeholder.
- Explicit searchable fields.
- Appropriate partial matching.
- Clear search reset action.
- Debounce when needed.
- Clear feedback for no matches.

Do not silently search only one field when users expect broader matching.

### 6.2 Filtering
Use meaningful business attributes (status, role, category, date range, owner).

Guidelines:
- Prioritize frequent filters.
- Group related filters.
- Match control type to data type.
- Show active filters clearly.
- Allow removing individual filters.
- Provide clear-all when multiple filters exist.

Do not expose every database field as a filter.

### 6.3 Sorting
Enable only for meaningful ordering.

Guidelines:
- Indicate sortable columns.
- Communicate active direction.
- Support asc/desc.
- Preserve sort state while paging.
- Avoid confusing sort behavior.

Use server-side sorting for large datasets.

## 7. Row actions and hierarchy

Classify actions by frequency, importance, and risk.

### Level 1: Primary
Examples: view, edit.

### Level 2: Secondary
Examples: duplicate, export, history, reset password.

### Level 3: Destructive/sensitive
Examples: delete, deactivate, revoke access.

Guidelines:
- Clearly distinguish destructive actions.
- Require confirmation for significant consequences.
- Explain impact.
- Avoid ambiguous labels.
- Avoid placing destructive actions too close to frequent primary actions.

Presentation:
- Inline buttons: few, frequent, obvious actions.
- Overflow menu: many or infrequent secondary actions.
- Clickable identifier/row: when detail navigation is primary and discoverable.

Do not make rows clickable only for implementation convenience.

## 8. Row selection and bulk actions

Implement selection only when users truly need multi-record operations.

Examples:
- Deactivate many users
- Export selected records
- Assign records in bulk
- Bulk status updates

Guidelines:
- Use checkboxes.
- Show selected count.
- Show bulk actions only when selection exists.
- Distinguish current page vs all matching records.
- Provide clear selection reset.
- Communicate scope.
- Confirm high-risk bulk actions.

Never imply that selecting one page means selecting entire dataset.

## 9. Density and visual hierarchy

Goal: efficient readability, not minimalism.

### 9.1 Density levels
- Comfortable: occasional inspection, more context.
- Standard: default.
- Compact: high-volume scanning and comparison.

Do not default to compact automatically.

### 9.2 Typography
- Clear hierarchy: title, headers, cell text.
- Avoid excessively small text.
- Use tabular numerals where useful.
- Keep sufficient contrast.
- Avoid bolding every cell.

### 9.3 Color
- Use semantic meaning consistently.
- Do not rely on color alone.
- Pair color with labels or accessible iconography.
- Avoid excessive badges.

### 9.4 Borders/background
- Prefer subtle separators.
- Keep clear row boundaries.
- Avoid heavy cell borders and unnecessary card nesting.
- Use zebra striping only when it improves scanning.

## 10. States

Do not design only the success state.

### 10.1 Loading
- Use skeleton rows when table shape is known.
- Minimize layout shift.
- Use spinner only when suitable.
- Avoid misleading placeholders.

### 10.2 Empty
Differentiate:
- No records exist
- No search results
- No filter results

Each state should provide specific guidance or next action.

### 10.3 Error
- Explain data cannot be loaded.
- Preserve search/filter inputs when possible.
- Offer retry action.
- Avoid exposing technical internals.

### 10.4 Partial data
- Communicate what is missing.
- Do not present incomplete data as complete.
- Preserve access to available information.

### 10.5 Updating row actions
- Provide success/failure feedback.
- Prevent duplicate submissions.
- Preserve table context.
- Update affected rows without unnecessary full resets.

## 11. Responsive behavior

Do not compress desktop tables blindly for mobile.

### Desktop priorities
- Efficient scanning
- Multiple visible columns
- Organized toolbar
- Keyboard efficiency
- Fast row actions

### Tablet considerations
- Reduced columns
- Horizontal scroll when justified
- Adaptive toolbar
- Touch-friendly targets

### Mobile strategy (choose intentionally)
1. Horizontal scrolling
2. Priority-column visibility
3. Row-to-card transformation
4. Dedicated detail views

If using row-to-card:
- Preserve label-value relationship.
- Keep access to all critical information.
- Keep actions discoverable.

Never hide essential information without alternative access.

## 12. Accessibility

Follow WCAG 2.2 AA and W3C WAI guidance.

### Semantic structure
- Use semantic table markup (`table`, `thead`, `tbody`, `tr`, `th`, `td`).
- Associate headers and cells properly.
- Use `scope` where relevant.
- Provide accessible name/caption when useful.
- Do not use table markup for visual page layout.

### Keyboard
- Keep all interactive controls keyboard accessible.
- Ensure sortable headers are keyboard operable.
- Ensure visible focus for actions and menus.
- Do not rely only on hover.

### Screen readers
- Provide meaningful labels for icon-only actions.
- Announce sorting state.
- Communicate loading/result updates.
- Associate row selection controls with records.
- Ensure status is understandable without color.

### Visual accessibility
- Maintain sufficient contrast.
- Support zoom and larger text.
- Avoid tiny targets.
- Keep clear focus indicators.

## 13. Data formatting

Format by meaning and locale.

### Dates
- Use consistent date format.
- Avoid ambiguous date representations.
- Include timezone when relevant.
- Distinguish date vs timestamp.

### Currency
- Always show currency symbol/code.
- Use consistent precision.
- Right-align monetary values.
- Do not mix currencies without labels.

### Numbers
- Use locale separators.
- Keep precision consistent.
- Right-align numeric values.

### Status
- Use consistent labels.
- Distinguish similar business states.
- Do not expose technical enum values in UI.

### Missing values
- Use a consistent placeholder convention.
- Do not confuse missing with zero/false.
- Avoid ambiguous empty cells.

## 14. Performance and scale

Match approach to dataset size:

- Small: client-side sort/filter can be enough.
- Medium/large: consider server-side pagination/sort/filter and query-state preservation.
- Very large: evaluate virtualization only when rendering cost justifies it.

Use stable row IDs and keep interactions responsive.

Do not add complex grid mechanics without real need.

## 15. Design decision framework

Before implementation, answer:
1. What is the primary purpose?
2. Who are the users?
3. What is the most frequent task?
4. What identifies each record?
5. Which columns are essential?
6. Is search needed?
7. Are filters needed?
8. Which columns need sorting?
9. Are row actions required?
10. Are bulk actions required?
11. Expected record volume?
12. Need server-side processing?
13. Mobile strategy?
14. Relevant loading/empty/error states?
15. Accessibility considerations?

Do not add features only because another table has them.

## 16. Anti-patterns

Avoid:
- Showing every database field as a column.
- Adding search/filter/export/pagination by default.
- Making every column sortable.
- Crowding rows with too many action icons.
- Icon-only actions without labels.
- Entire-row click behavior with conflicting nested controls.
- Excessive badges/colors.
- Card-in-card table layouts without reason.
- Tiny typography just to fit more columns.
- Hiding critical mobile information.
- Generic one-size empty state.
- Promoting destructive actions as primary.
- Using tables as spreadsheet substitutes.
- Client-side processing where server-side is needed.

## 17. Implementation requirements

When asked to design or implement a table:

1. Analyze business context, user, data, and workflow.
2. Classify dominant table type.
3. Propose anatomy, essential columns, search/filter/sort, actions, pagination, responsive behavior, and states.
4. Justify key decisions with use-case context.
5. Implement with current stack/design system, semantic markup, accessibility, and maintainability.
6. Validate against the checklist.

## 18. Quality checklist

### Information architecture
- [ ] Clear purpose
- [ ] Title describes dataset
- [ ] Relevant columns
- [ ] Prioritized important info
- [ ] Redundancy removed

### Interactions
- [ ] Search works as expected
- [ ] Filters are understandable
- [ ] Sorting is meaningful
- [ ] Row actions are discoverable
- [ ] Bulk actions are appropriate
- [ ] Pagination is consistent

### Visual design
- [ ] Clear typography hierarchy
- [ ] Column widths are appropriate
- [ ] Numeric alignment is correct
- [ ] Status indicators are consistent
- [ ] Balanced spacing and density
- [ ] Easy scanning

### States
- [ ] Loading
- [ ] Empty
- [ ] No search results
- [ ] No filter results
- [ ] Error
- [ ] Action feedback

### Accessibility
- [ ] Semantic table structure
- [ ] Keyboard navigation
- [ ] Visible focus
- [ ] Accessible action labels
- [ ] Adequate contrast
- [ ] Status not color-only

### Responsive behavior
- [ ] Desktop layout works
- [ ] Tablet layout works
- [ ] Mobile strategy works
- [ ] No essential information is lost

## 19. Final principle

A professional enterprise table is defined by how effectively users can find, understand, compare, and act on information.

Design for the task, not for the component.
