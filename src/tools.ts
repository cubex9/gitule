import { Stream } from "./stream";
import { ICommandConfiguration } from "./configuration";

/**
 * 
 * @param cfg array with command configurations
 * @returns the string array with command.identifier
 */
export function commandsToArray(cfg: ICommandConfiguration[]): string[] {
	const commands : string[] = [];
	cfg.forEach(cmd => commands.push(cmd.identifier));
	return commands;
}

export function searchCommandByIdentifier(cfg: ICommandConfiguration[], identifier: string | undefined): ICommandConfiguration | undefined {
	return Stream.of(cfg).filter((a:ICommandConfiguration) => a.identifier === identifier).first();
	
	// return new Promise(() => {
    //     for(var c of cfg) {
	// 	    if(c.identifier === identifier) {
    //             return c;
	// 	    }
	//     }   
    // });
}