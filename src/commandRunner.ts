import { CONFIG, GITULE, SHELL } from './gitule';
import * as vscode from 'vscode';
import { IConfiguration, ICommandConfiguration } from './configuration';
import { question } from './questions';
import { Terminal } from './terminal';
import { strtr } from "./strtr";

export class RunScript {
	static outputChannel? : vscode.OutputChannel;

	public constructor() {
	}

	public static getOutputChannel() : vscode.OutputChannel {
		return RunScript.outputChannel ??= vscode.window.createOutputChannel(GITULE);	
	}

	public static executeCommand(command: ICommandConfiguration | undefined) {
		if(!command) {
			return;
		}

		const variables = question(command);
		const builtCommand = strtr(command.command, variables);
        const options: vscode.TerminalOptions = {
            cwd: command.workingDirectory,
            //shellPath: vscode.workspace.getConfiguration().get(<string>(SHELL))
        };

		const terminal: vscode.Terminal = Terminal.getTerminal(options);
		terminal.sendText(builtCommand, true);

		RunScript.getOutputChannel().appendLine(`${GITULE} run: ${builtCommand}`);
	}

	// public runCommand(): void {
	// 	const configuration = vscode.workspace.getConfiguration().get<IConfiguration>(CONFIG);

	// 	if (!configuration) {
    //         console.log(`Configuration of ${GITULE} does not found`);
	// 		return;
	// 	}

	// 	const configurationCommands = configuration.commands || [];
	// 	const commands: { [id: string]: ICommandConfiguration } = {};
	// 	const items: Array<string> = [];
	// 	for (const command of configurationCommands) {
	// 		if (!command.description) {
	// 			continue;
	// 		}

	// 		commands[command.description] = command;
	// 		items.push(command.description);
	// 	}

	// 	vscode.window.showQuickPick(items, {
	// 		placeHolder: 'Which command do you want to run?',
	// 		ignoreFocusOut: true,
	// 	}).then((value?: string) => {
	// 		if (!value) {
	// 			return;
	// 		}


	// 		const command = commands[value];

	// 		this.executeCommand(command);
	// 	});
	// }

}
