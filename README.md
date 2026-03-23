# Stage Door

Stage Door is a React + TypeScript site for Stage Door Productions Charitable Trust.
The current app presents a landing page for the trust, a contact form, sponsor acknowledgements, and placeholder routes for additional content pages.

## Current Features

- Responsive navigation with desktop and mobile layouts
- Home page with trust messaging and contact section
- Contact form with name, email, and message fields
- Sponsor logo grid with outbound links
- Separate routes for `Home`, `About`, and `Newsletters`

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- shadcn/ui primitives

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  assets/        Static assets such as sponsor logos
  components/    Shared UI and feature components
  data/          Route and navigation metadata
  lib/           Small utilities
  pages/         Route-level page components
```

## Routes

- `/` - Home page with contact form and sponsors
- `/about` - About page placeholder
- `/newsletters` - Newsletters page placeholder

## Notes

- The contact form currently logs submitted data to the console and is not yet connected to a backend or email service.
- `About` and `Newsletters` are still scaffold routes and can be expanded as content is added.
