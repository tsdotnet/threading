/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET-Core/blob/master/LICENSE.md
 */

/* eslint-disable no-empty */

declare const process: any;

// Modern approach: Check for require directly instead of eval
let r: any;
try {
	// Check if require exists in the global scope (CommonJS/Node.js)
	r = typeof require !== 'undefined' ? require : undefined;
} catch(ex) {
	r = undefined;
}

// ESM environment detection
let isESMEnvironment: boolean = false;
try {
	// In ESM, require is not defined, and module is not defined
	isESMEnvironment = typeof require === 'undefined' && typeof module === 'undefined';
} catch (ex) {
	// If we get here, we're likely in ESM
	isESMEnvironment = true;
}

export const
	isCommonJS: boolean
		= !!(r && r.resolve) && !isESMEnvironment;

export const
	isRequireJS: boolean
		= !!(r && r.toUrl && r.defined) && !isESMEnvironment;

/*
 * Ensure is in a real Node environment, with a `process.nextTick`.
 * To see through fake Node environments:
 * Mocha test runner - exposes a `process` global without a `nextTick`
 * Browserify - exposes a `process.nexTick` function that uses
 * `setTimeout`. In this case `setImmediate` is preferred because
 * it is faster. Browserify's `process.toString()` yields
 * "[object Object]", while in a real Node environment
 * `process.nextTick()` yields "[object process]".
 * 
 * ESM hack: In test environments like Vitest, we want to detect Node
 * but handle the ESM case gracefully.
 */

export const
	isNodeJS: boolean
		= typeof process=='object'
		&& process.toString()==='[object process]'
		&& process.nextTick!= void 0;

// Export flag for ESM environment detection
export const isESM: boolean = isESMEnvironment;

declare const exports: any;
//noinspection JSUnusedAssignment
try
{ Object.freeze(exports); }
catch(ex)
{ }
