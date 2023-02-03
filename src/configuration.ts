export interface IConfiguration {
	commands: ICommandConfiguration[];
}

export interface ICommandConfiguration {
	identifier: string;
	description: string;
	command: string;
	workingDirectory: string;
	form?: IFormConfiguration[];
	showInConsole?: boolean;
}

export interface IFormConfiguration {
	variable: string;
	question: string;
	default?: string;
	password?: boolean;
	options?: string[];
	defaultValuePath?: boolean;
	defaultValueFilename?: boolean;
}

