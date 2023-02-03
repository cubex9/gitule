// Source: https://gist.github.com/gcnew/5d78006b0cf80a292969
import { VALUATOR } from "./gitule";

// Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegExp(string: string) {
	return string.replace(VALUATOR, "\\$&");
}

/**
 * overloads:
 *   strtr(String string, Dictionary<String, String> translations): String
 */
export function strtr(template: string, values: { [id: string]: string } ): string {
	return Object.keys(values)
		.reduce((prev, curr) => prev.replace(new RegExp(escapeRegExp(curr), 'g'), String(values[curr]).replace(/\$/g, '$$$$')), template);
}