import * as assert from 'assert';

import * as vscode from 'vscode';
import * as tools from '../../tools';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Tools test', () => {
        assert.equal(tools.compileCommand('test ${fest}', new Map<string,string>([[ 'fest' , '1' ]])), 'test 1');
        assert.equal(tools.compileCommand('test ${fest} ${ultrafest}', new Map<string,string>([[ 'fest' , '1' ],[ 'ultrafest', '2']])), 'test 1 2');
	});
});