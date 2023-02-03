import { GITULE } from './gitule';
import * as vscode from 'vscode';
import { IConfiguration, ICommandConfiguration } from './configuration';
import { question } from './questions';
import { Terminal } from './terminal';
import * as tools from './tools';

export class RunScript {
	static outputChannel? : vscode.OutputChannel;

	public constructor() {
	}

	public static getOutputChannel() : vscode.OutputChannel {
		return RunScript.outputChannel ??= vscode.window.createOutputChannel(GITULE);	
	}

	// TODO: create instance of change running instance of terminal by the cwd changes
	public static executeCommand(command: ICommandConfiguration | undefined) {
		if(!command) {
			return;
		}

		const variables : Map<string,string> = question(command);
		const builtCommand = tools.compileCommand(command.command, variables);
		const cwd = tools.currentlyOpen()?.tabFilePath || './';
        const options: vscode.TerminalOptions = {
            cwd: cwd,
        };

		const terminal: vscode.Terminal = Terminal.getTerminal(options);
		terminal.sendText(builtCommand, true);

		RunScript.getOutputChannel().appendLine(`${GITULE} run: ${builtCommand}`);
	}

}
