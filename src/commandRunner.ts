import { GITULE, VALUATOR } from './gitule';
import * as vscode from 'vscode';
import { IConfiguration, ICommandConfiguration } from './configuration';
import { question } from './questions';
import { Terminal } from './terminal';

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

		const variables : Map<string,string> = question(command);
		const builtCommand = RunScript.compileCommand(command.command, variables);
        const options: vscode.TerminalOptions = {
            cwd: command.workingDirectory,
        };

		const terminal: vscode.Terminal = Terminal.getTerminal(options);
		terminal.sendText(builtCommand, true);

		RunScript.getOutputChannel().appendLine(`${GITULE} run: ${builtCommand}`);
	}

	private static compileCommand(template: string, values : Map<string,string>) : string {
		return template.replace(VALUATOR, (match: string, ...args: any[]) => values.get(match) || '' );
	}

}
