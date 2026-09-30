# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


## SEO, redirects and 404 tracking

- `src/lib/seo.ts`: `useSeo()` writes the Strapi SEO fields (title, description, keywords, canonical, robots/noindex, Open Graph, Twitter card, JSON-LD) into `<head>` and restores the defaults on leaving the page. Used by `DynamicPage` and the case study page.
- `src/components/RedirectResolver.tsx`: wraps the routes, loads `GET /api/redirects/lookup` (cached 5 min in sessionStorage), follows chains, keeps the query string, fails open if Strapi is down. This is a browser-side redirect.
- `src/pages/NotFound.tsx`: posts each missing path to `POST /api/not-found-logs/track` and sets `noindex`. A failed API call on a real page shows an error instead of a false 404.
- Real HTTP 301/302 for search engines: run `npm run redirects:htaccess` before deploying; it writes the Strapi redirects into `public/.htaccess` (Apache).
