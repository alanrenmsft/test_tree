// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createTestTree, TreeDataProvider, TreeNode } from './treeDataProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const level4 = new TreeNode('node 1/2/3/4');
	const level3 = new TreeNode('node 1/2/3', [level4]);
	const level2 = new TreeNode('node 1/2', [level3]);
	const level1 = new TreeNode('node 1', [level2]);
	const provider = new TreeDataProvider(level1);
	context.subscriptions.push(vscode.window.registerTreeDataProvider('testTreeView', provider));
	context.subscriptions.push(vscode.commands.registerCommand('test-tree.refresh', () => {
		provider.refreshNode(level4);
		provider.refreshNode(level4);
		provider.refreshNode(level2);
	}));

}

// this method is called when your extension is deactivated
export function deactivate() { }

