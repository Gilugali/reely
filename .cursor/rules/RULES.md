---
description : "Frontend rules for the Mobile social reels Scraper. Enforces ui-only responsibilities, architecture boundaries, typing and discipline "
alwaysApply : true
---

# Frontend Rules - Mobile social reels scraper 

These rules apply to **all frontend work** in this project .

The frontend is **NOT** responsible for scraping, parsing, or bypassing platforms.
Its job is **input -> display -> state management** only
---

## 1. Technology stack (Fixed)

- React native 
- Expo
- Typescript
- fetch / Axios for HTTP
- Zustand for state (stay consistent)

Cursor must **NOT** introduce new frameworks without justification

---

## 2. Responsibility Boundaries (Non-negotiable)

### Frontend CAN: 
    - accept user input (urls)
    - validate url format
    - send requests to backend 
    - display results 
    - show errors & loadding states
    - cache UI state locally 
### Frontend MUST NOT: 
    - Scrape HTML 
    - parse plateform pages
    - Use headless browsers
    - call undocumented platform APIs'
    - Bypass ToS or rate limits 

any scraping logic in react native is forbidden.


## 3. Mandatory folder structure

The following structure is required:

```txt
src/
  components/        # Reusable UI components
  screens/           # Screen-level components
  services/          # API clients only (no business logic)
  store/             # Global state management
  hooks/             # Custom React hooks
  types/             # Shared TypeScript types
  utils/             # Pure helper functions only