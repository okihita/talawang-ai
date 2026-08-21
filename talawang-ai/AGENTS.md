# AGENTS.md — System & Design Directives for Talawang AI

This file contains mandatory guidelines and behavioral constraints for all AI agents working on this codebase.

---

## 1. 🔤 Typography & Design Directives (MANDATORY)
- **NO MONO FONT**: **Do NOT use monospace fonts (`font-mono`)** for UI elements, labels, headers, incident reports, telemetry badges, stats, or story text.
- **Always use modern sans-serif** typography (Geist Sans / Tailwind `font-sans`).
- Monospace font is **ONLY permitted** for raw executable code blocks in technical integration guides (e.g. `<pre>` / `<code>` snippets in `TechnicalArchitecture.tsx`).
- **NO CHEAP EMOJIS IN BUTTONS / CONTROLS**: Never use unicode emojis (such as `⏪`, `⏩`, `🔄`, `➡️`) for UI action buttons or control labels. Always use clean, professional **Lucide React SVG icons** (e.g. `<Rewind />`, `<RotateCcw />`, `<ChevronRight />`).

---

## 2. ⚡ Server & Build Rules
- **NEVER RUN `pnpm dev`**: The user runs the development server in their own terminal. Never launch long-running or background `pnpm dev` tasks.
- **ALWAYS VERIFY WITH `pnpm build`**: Before reporting completion, run `pnpm build` to verify 0 TypeScript / Turbopack compilation errors.
- **GIT COMMITS**: Commit with conventional commit messages and push to `origin main` after verifying builds.

---

## 3. 🌐 Internationalization & Defaults
- **Default Language**: Bahasa Indonesia (`"id"`).
- **Secondary Language**: English (`"en"`).
- **Default Theme**: Light mode by default (`"light"`), with persistent dark mode toggle in `localStorage`.
- Use `useI18n()` from `@/i18n/I18nContext` for all UI text, headings, and CTA buttons.

---

## 4. 💬 Chat & Simulator UI/UX Rules
- **No Layout Shifts (Zero CLS)**:
  - Fix container heights (`h-[460px] sm:h-[500px]` for chat stage, `min-h-[44px]` for context text, `h-[50px]` for buttons) to prevent vertical layout shifts.
  - Action buttons must remain completely stationary throughout all step progressions.
  - Message bubbles must have fixed outer widths (`w-[92%] sm:w-[86%]`) so character-by-character typewriter streaming does not jitter or expand horizontally.
- **4-Step Story Tracks with Time Rewind**:
  - Unprotected Mode: 4 Steps (Greeting $\rightarrow$ Attack $\rightarrow$ Breach $\rightarrow$ Incident Report).
  - Step 4 of Unprotected leads to **Rewind Time (`<Rewind />`)** to Step 1 of Protected Mode.
  - Protected Mode: 4 Steps (Greeting $\rightarrow$ Attack $\rightarrow$ 5.9ms Intercept $\rightarrow$ Telemetry Audit).
- **Distinct Telemetry Styling**:
  - Telemetry and Incident reports must NEVER be styled like chat bubbles. They must use full-width security console banner styling.

---

## 5. 🔀 Git Flow & Versioning Guidelines (MANDATORY)
- **Git Flow Branching & Conventions**:
  - All development follows Git Flow methodology.
  - Feature branches: `feat/<feature-name>`
  - Bugfix branches: `fix/<bug-name>`
  - Maintenance / refactors: `chore/<task-name>` or `refactor/<name>`
  - Releases: `release/vX.Y.Z` or tagged directly on `main`
- **Conventional Commits**:
  - Structure commits using standard types: `feat:`, `fix:`, `style:`, `docs:`, `chore:`, `refactor:`, `test:`.
  - Provide descriptive summaries explaining the why and what of the change.
- **Semantic Release & Version Tagging**:
  - Track versions in `package.json` following `MAJOR.MINOR.PATCH` Semantic Versioning.
  - Each official release must:
    1. Pass `pnpm build` with zero errors.
    2. Be committed with `chore(release): vX.Y.Z`.
    3. Be tagged with an annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
    4. Be pushed to remote with tags: `git push origin main --tags`.
