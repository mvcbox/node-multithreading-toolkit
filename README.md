# Multithreading toolkit

### Install:
```bash
npm install multithreading-toolkit --save
```

### `workerThreadsFunction` - Execution of a function in a separate thread (based on [worker_threads](https://nodejs.org/api/worker_threads.html) module). Available for Node.js version 10.5.0 and higher.

### workerThreadsFunction args:
- `source`: Function or path to the module that exports the function (Function/String)
- `options`: Options when creating a function (Object):
- `options.returnTimeout`: Return timeout (milliseconds) (Default: 60000)
- `options.eval`: `true`, if the function was passed as the source, `false` if the path to the module was passed as the source (Default: false)
- `options.execArgv`: execArgv for `Worker` instance (Array) (Default: [])
- `options.pool`: Do I need to use a pool of workers (Bool) (Default: false)
- `options.poolOptions`: Pool options for [generic-pool](https://www.npmjs.com/package/generic-pool)


### Example:
```js
'use strict';

const { workerThreadsFunction } = require('multithreading-toolkit');

const someFunction = workerThreadsFunction(function (arg1, arg2, arg3) {
    // arg1, arg2, arg3 - Some data for calculations
    // Some heavy calculations, which usually block the thread
    return 'Some result';
}, {
    eval: true
});

someFunction(1, 2, 3).then(console.log).catch(console.error);

```

### `forkFunction` - Execution of a function in a separate thread (based on [child_process.fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)).

### forkFunction args:
- `source`: Function or path to the module that exports the function (Function/String)
- `options`: Options when creating a function (Object):
- `options.returnTimeout`: Return timeout (milliseconds) (Default: 60000)
- `options.eval`: `true`, if the function was passed as the source, `false` if the path to the module was passed as the source (Default: false)
- `options.forkOptions`: options for [child_process.fork](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)
- `options.pool`: Do I need to use a pool of workers (Bool) (Default: false)
- `options.poolOptions`: Pool options for [generic-pool](https://www.npmjs.com/package/generic-pool)


### Example:
```js
'use strict';

const { forkFunction } = require('multithreading-toolkit');

const someFunction = forkFunction(function (arg1, arg2, arg3) {
    // arg1, arg2, arg3 - Some data for calculations
    // Some heavy calculations, which usually block the thread
    return 'Some result';
}, {
    eval: true
});

someFunction(1, 2, 3).then(console.log).catch(console.error);

```
