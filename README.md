# OXOP Portfolio

A responsive portfolio website for OXOP, built with HTML, CSS, browser JavaScript, and Node.js.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm start
```

Open http://localhost:3000.

## Edit projects

Edit `projects.json` and add project objects:

```json
{
  "name": "Project name",
  "category": "CATEGORY",
  "description": "Short project description",
  "github": "https://github.com/username/project",
  "website": "https://example.com"
}
```

The `github` and `website` fields are optional.

## GitHub Pages

The GitHub Actions workflow builds the static site with Node.js and deploys the `dist` directory to GitHub Pages whenever changes are pushed to `main`.

In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**.
