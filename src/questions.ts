import { ICommandConfiguration, IFormConfiguration } from "./configuration";
import * as vscode from "vscode";
import * as path from "path";

function askQuestion(form: IFormConfiguration) {
    const boxOptions : vscode.InputBoxOptions = {
        prompt: form.question,
        ignoreFocusOut: true,
    };

    if (form.options) {
        return vscode.window.showQuickPick(form.options, boxOptions);
    } else {
        if (form.defaultValuePath) {
            boxOptions.value = currentlyOpen().tabfilePath;
        } else if(form.defaultValueFilename) {
            boxOptions.value = currentlyOpen().tabfileName;
        } else {
            boxOptions.value = form.default;
            boxOptions.password = form.password;
        }
        return vscode.window.showInputBox(boxOptions);
    }
}

function currentlyOpen() : any {
    try {
        if(vscode.window.activeTextEditor) {
            let tabfilePath = vscode.window.activeTextEditor.document.fileName;
            return {
                tabfilePath: tabfilePath,
                tabfileName: path.basename(tabfilePath)
            };
        }
        console.log("Error: not currentyly open editor...");
    } catch (error) {
    }

    return undefined;

}

export function question(command: ICommandConfiguration): { [id: string] : string } {

    const variables: { [id: string]: string } = {};
    const form = command.form || [];
    form.forEach(step => {
        console.log('Displaying question', step.question);
        askQuestion(step).then((value?: string) => {
            if(value) {
                variables[step.variable] = value;
            }
        });
    });

    return variables;
}

