import { Stream } from "./stream";
import { ICommandConfiguration } from "./configuration";
import * as vscode from "vscode";
import * as path from "path";

/**
 * 
 * @param cfg array with command configurations
 * @returns the string array with command.identifier
 */
export function commandsToArray(cfg: ICommandConfiguration[]): string[] {
	return Stream.of(cfg).map((c:ICommandConfiguration) => c.identifier).toArray();
}

export function searchCommandByIdentifier(cfg: ICommandConfiguration[], identifier: string | undefined): ICommandConfiguration | undefined {
	return Stream.of(cfg).filter((a:ICommandConfiguration) => a.identifier === identifier).first();
}

export function compileCommand(template: string, values : Map<string,string>) : string {
	return template.replace(/\$\{([^\}]+)\}/g, (match: string, ...args: any[]) => {
		return values.get(args[0]) || '';
	 });
}

export function currentlyOpen() : { tabFilePath: string, tabFileName: string } | undefined {
    try {
        if(vscode.window.activeTextEditor) {
            let filename = vscode.window.activeTextEditor.document.fileName;
            return {
                tabFilePath: path.dirname(filename),
                tabFileName: filename
            };
        }
        console.log("Error: not currentyly open editor...");
    } catch (error) {
    }

    return undefined;

}