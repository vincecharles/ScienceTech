import * as Module from 'node:module'
import { pathToFileURL } from 'node:url'
import * as env from './env'
export * from './compile'
export * from './instrumentation'
export * from './normalize-path'
export { env }

// In Bun, ESM modules will also populate `require.cache`, so the module hook is
// not necessary.
if (!process.versions.bun) {
  // `Module#register` was added in Node v18.19.0 and v20.6.0
  //
  // Not calling it means that while ESM dependencies don't get reloaded, the
  // actual included files will because they cache bust directly via `?id=…`
  Module.register?.(pathToFileURL(require.resolve('@tailwindcss/node/esm-cache-loader')))
}
