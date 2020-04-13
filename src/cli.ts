#!/usr/bin/env node

import glob from "glob"
import { run } from "./runner.js"
import path from "path"
import process from "process"
import { cliLogger as logger } from "./logging.js"

const [_, __, ...args] = process.argv
logger.log("args", args)

const filepaths = args.length > 0 ? args : [
	...glob.sync("**/*.test.js"),
	// ...glob.sync("**/*.test.jsx"),
	// ...glob.sync("**/*.test.ts"),
	// ...glob.sync("***/*.test.tsx"),
]

logger.log("filepaths", filepaths.map(filepath => path.join(process.cwd(), filepath)))
run(filepaths.map(filepath => path.join(process.cwd(), filepath)))
	.catch(err => logger.error(err))
