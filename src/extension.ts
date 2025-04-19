import * as vscode from 'vscode';
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
    const provider = {
        provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
            const wordRange = document.getWordRangeAtPosition(position, /(["'`])(?:(?=(\\?))\2.)*?\1/);
            if (!wordRange) {
                return;
			}
            const line = document.lineAt(position.line).text;
            if (!/apiFetcher\s*\(\s*['"`]/.test(line)) {
                return;
            }
            const srcRoot = findSrcFolder(path.dirname(document.uri.fsPath));
            const relativePath = document.getText(wordRange).slice(1, -1);
            const fullPath = [srcRoot, relativePath, '+server.ts'].join('/');
			return new vscode.Location(vscode.Uri.file(fullPath), new vscode.Position(0, 0));
        }
    };
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(['typescript', 'javascript', 'svelte'], provider));
}

function findSrcFolder(dir: string): string | null {
    const normalizedDir = dir.replace(/\\/g, '/');
    const parts = normalizedDir.split('/src/');

    const path = parts.slice(0, -1).join('/src/') + '/src/routes';

    return path;
}

export function deactivate() {}
