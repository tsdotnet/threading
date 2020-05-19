/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */
/**
 * @packageDocumentation
 * @module threading
 */

/* eslint-disable no-empty */

declare const process: any;

// Need to spoof this so WebPack doesn't panic (warnings).
let r: any;
try
{ r = eval('require'); }
catch(ex)
{}


export const
	isCommonJS: boolean
		= !!(r && r.resolve);


export const
	isRequireJS: boolean
		= !!(r && r.toUrl && r.defined);

/*
 * Ensure is in a real Node environment, with a `process.nextTick`.
 * To see through fake Node environments:
 * Mocha test runner - exposes a `process` global without a `nextTick`
 * Browserify - exposes a `process.nexTick` function that uses
 * `setTimeout`. In this case `setImmediate` is preferred because
 * it is faster. Browserify's `process.toString()` yields
 * "[object Object]", while in a real Node environment
 * `process.nextTick()` yields "[object process]".
 */

export const
	isNodeJS: boolean
		= typeof process=='object'
		&& process.toString()==='[object process]'
		&& process.nextTick!= void 0;

declare const exports: any;
//noinspection JSUnusedAssignment
try
{ Object.freeze(exports); }
catch(ex)
{ }
