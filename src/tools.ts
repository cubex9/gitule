import { Stream } from "./stream";
import { ICommandConfiguration } from "./configuration";

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