// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RunScript } from './commandRunner';
import * as tools from './tools';
import * as conf from './configuration';
import { CONFIG, DEFAULT_CONFIG } from './gitule';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gitule" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const cfg = vscode.workspace.getConfiguration().get<conf.IConfiguration>(CONFIG) || DEFAULT_CONFIG;
	if(cfg) {
		cfg.commands.forEach(cmd => {
			const disposable = vscode.commands.registerCommand('gitule', () => {
				// The code you place here will be executed every time your command is executed
				// Display a message box to the user
				vscode.window.showInformationMessage(cmd.identifier + ' from gitule! dopici ma vrtule');
				vscode.window.showQuickPick(tools.commandsToArray(cfg.commands), {}).then(i => {
					RunScript.executeCommand(tools.searchCommandByIdentifier(cfg.commands, i));
				});
			});
			context.subscriptions.push(disposable);
		});
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
