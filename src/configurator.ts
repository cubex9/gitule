// // import { IConfiguration } from "./configuration";
// // import { workspace, Disposable, window, commands } from "vscode";
// // import { CommandRunner } from "./command_runner";

// import { IConfiguration } from "./configuration";
// import * as vscode from 'vscode';
// import { CONFIG } from "./gitule";

// export class Configurator {
// 	//private commandRunner: CommandRunner;
// 	private registeredCommands: { [id: string]: vscode.Disposable } = {};
// 	// public constructor(commandRunner: CommandRunner) {
// 	// 	this.commandRunner = commandRunner;

// 	// }

// 	public registerCustomCommands() {
// 		const configuration = vscode.workspace.getConfiguration().get<IConfiguration>(CONFIG);

// 		if (!configuration) {
// 			return;
// 		}

// 		const configurationCommands = configuration.commands || [];
// 		for (const command of configurationCommands) {
// 			if (command.identifier) {
            
//                 if (!this.registeredCommands[command.identifier]) {
//                     this.registeredCommands[command.identifier] = vscode.commands.registerCommand('gitule.' + command.identifier, () => {
//                         console.log(command);
//                         this.commandRunner.executeCommand(command);
//                     });
//                     vscode.window.showErrorMessage(command.identifier + ' is already registered. Make sure to assign a unique identifier to each of your commands!');
//                     continue;
//                 }

//                 this.registeredCommands[command.identifier] = vscode.commands.registerCommand('script-runner.' + command.identifier, () => {
//                     console.log(command);
//                     this.commandRunner.executeCommand(command);
//                 });

//             }

// 		}
// 	}

// }