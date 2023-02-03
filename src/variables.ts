// import { workspace } from "vscode";
// import { ICommandConfiguration, IConfiguration } from "./configuration";
// import { GITULE_CONF } from "./gitule"

// export class VariableManager {
// 	public getVariables(): { [id: string]: string } {

// 		// We do this because configuration.variables is a proxy to the data, so we can't use it as a dumb object
// 		const configurationVariables = workspace.getConfiguration().get<ICommandConfiguration>(GITULE_CONF+'.variables') || {};
// 		let variables: { [id: string]: string } = {};
// 		for (let key in configurationVariables) {
// 			variables[key] = configurationVariables[key];
// 		}

// 		return variables;
// 	};

// 	public resolveVariables(text: string, variables: { [id: string]: string }) {
// 		return strtr(text, variables);
// 	}
// }