![@tsdotnet/threading: Hand work to workers. Tasks, deferral and workers.](https://cdn.jsdelivr.net/gh/tsdotnet/threading@master/assets/banner.svg)

[![npm version](https://img.shields.io/npm/v/@tsdotnet/threading.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/threading)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/threading/blob/master/LICENSE)

Task scheduling and workers: defer work, run deferrable `Task`s, and hand jobs to other threads.

## Install

```sh
npm install @tsdotnet/threading
```

## Usage

```ts
import { defer, Task } from '@tsdotnet/threading';

const later = defer(() => console.log('later'), 500);
later.cancel(); // true: it never ran

const task = new Task(() => 6 * 7);
task.result; // 42, computed on first read
```

`start()` schedules a `Task` to run later, and `Worker` hands work to another thread.

## Use it from

ESM (`import { defer, Task } from '@tsdotnet/threading';`) or CommonJS (`const { defer, Task } = require('@tsdotnet/threading');`). No `<script>` (UMD) build: use it with a bundler or Node.js.

## Docs

[tsdotnet.github.io/threading](https://tsdotnet.github.io/threading/)
