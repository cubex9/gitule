import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Stream } from '../../stream';

// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start stream tests.');

	test('Stream test', () => {
        assert.equal(Stream.of([1, 2, 3]).filter(n => n === 2).map(n => `#${n}`).first(), "#2" );
        assert.deepEqual(Stream.of([1, 2, 3]).map(n => `#${n}`).toArray(), ['#1', '#2', '#3']);
	});
});