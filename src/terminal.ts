import * as vscode from 'vscode';
import { GITULE } from './gitule';

export class Terminal {
    static term?: vscode.Terminal;

    static getTerminal(options: vscode.TerminalOptions) {
        if(!Terminal.term) {
            options.name = GITULE;
            options.shellPath = "powerShell.exe";

            Terminal.term = vscode.window.createTerminal(options);
            Terminal.term.show(true);

            // if user closes the terminal, delete our reference:
            vscode.window.onDidCloseTerminal(event => {
                if (Terminal.getTerminal(options) && event.name === GITULE) {
                    Terminal.term = undefined;
                }
            });
        }

        return Terminal.term;
    }
}