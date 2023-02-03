import { ICommandConfiguration, IFormConfiguration } from "./configuration";
import * as vscode from "vscode";
import * as tools from "./tools";

function askQuestion(form: IFormConfiguration) {
    const boxOptions : vscode.InputBoxOptions = {
        prompt: form.question,
        title: form.variable,
        ignoreFocusOut: false
    };

    if (form.options) {
        return vscode.window.showQuickPick(form.options, boxOptions);
    } else {
        if (form.defaultValuePath) {
            boxOptions.value = tools.currentlyOpen()?.tabFilePath;
        } else if(form.defaultValueFilename) {
            boxOptions.value = tools.currentlyOpen()?.tabFileName;
        } else {
            boxOptions.value = form.default;
            boxOptions.password = form.password;
        }
        return vscode.window.showInputBox(boxOptions);
    }
}

export function question(command: ICommandConfiguration): Map<string,string> {

    const variables: Map<string,string> = new Map(); // { [id: string]: string } = {};
    const form = command.form || [];
    form.forEach(step => {
        console.log('Displaying question: ', step.question);
        askQuestion(step).then((value?: string) => {
            variables.set(step.variable,resolveVariable(step, value));
        });

        // default or empty
        if(!variables.has(step.variable)) {
            variables.set(step.variable, resolveVariable(step, undefined));
        }
    });

    return variables;
}

function resolveVariable(command: IFormConfiguration, value?: string) : string {
    let result = value || command.default;
    if(result && command.prefix) {
        result = command.prefix + result;
    }
    return result || '';
}

