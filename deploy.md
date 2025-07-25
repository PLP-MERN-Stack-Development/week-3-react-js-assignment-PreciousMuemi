# Deployment Guide for GitHub Pages

## Steps to Deploy

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions" or "Deploy from a branch"
   - If using branch deployment, select the `main` branch and `/docs` folder
   - If using GitHub Actions, create a workflow file

## GitHub Actions Workflow (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. Copy the contents of the `dist` folder to a `docs` folder in your repository
3. Push the changes
4. In repository settings, set Pages source to "Deploy from a branch" and select the `docs` folder

## Important Notes

- The `vite.config.js` is already configured with the correct base path
- The build process creates optimized files in the `dist` folder
- Make sure your repository is public for GitHub Pages to work
- The deployed URL will be: `https://[username].github.io/week-3-react-js-assignment-PreciousMuemi/`

## Troubleshooting

If you see 404 errors:

1. Make sure the base path in `vite.config.js` matches your repository name
2. Ensure the build completed successfully
3. Check that the deployed files are in the correct location
4. Wait a few minutes for GitHub Pages to update
