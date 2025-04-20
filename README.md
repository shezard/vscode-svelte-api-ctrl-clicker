# VSCode Svelte API Ctrl-Clicker

Enables ctrl-click on string matching `'/api/foo/bar'` or `"/api/foo/me"`

This will redirect to `/src/routes/api/foo/bar/+server.ts` and `/src/routes/api/foo/me/+server.ts` respectively

# Publish

```bash
npm install -g @vscode/vsce
vsce package
```
