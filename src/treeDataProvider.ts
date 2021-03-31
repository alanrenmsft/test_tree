'use strict';

import * as vscode from 'vscode';

export class TreeNode {
    constructor(public label: string, public children: TreeNode[] = []) {
    }
}

export class TreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
    private _onDidChangeTreeData = new vscode.EventEmitter<TreeNode | undefined>();

    constructor(private _root: TreeNode) {
    }

    onDidChangeTreeData: vscode.Event<TreeNode | undefined | null> = this._onDidChangeTreeData.event;

    getTreeItem(element: TreeNode): vscode.TreeItem {
        let item: vscode.TreeItem = {};
        item.label = element.label;
        item.id = element.label;
        item.collapsibleState = element.children.length === 0 ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed;
        return item;
    }

    getChildren(element?: TreeNode): vscode.ProviderResult<TreeNode[]> {
        if (element) {
            return new Promise((resolve => {
                setTimeout(() => {
                    resolve(element.children);
                }, 300);;
            }));
        } else {
            return Promise.resolve([this._root]);
        }
    }

    public refreshNode(node: TreeNode | undefined): void {
        this._onDidChangeTreeData.fire(node);
    }
}
