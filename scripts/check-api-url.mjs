import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const configPath = resolve(import.meta.dirname, '../src/implementationConfig.ts')
const source = readFileSync(configPath, 'utf8')

const match = source.match(/const\s+api_url\s*(?::\s*string)?\s*=\s*(['"`])([^'"`]*)\1/)
if (!match) {
  console.error(`[check-api-url] Could not find an api_url declaration in ${configPath}`)
  process.exit(1)
}

const apiUrl = match[2]
const errors = []

// Boundary after "localhost" so we don't flag e.g. https://localhost.example.com
if (/^https?:\/\/localhost(?:[:/]|$)/i.test(apiUrl)) {
  errors.push('must not point at localhost')
}
if (!apiUrl.startsWith('https://')) {
  errors.push('must start with "https://"')
}

if (errors.length > 0) {
  console.error(`\n[check-api-url] Refusing to build the SSG site: api_url = "${apiUrl}"`)
  for (const e of errors) console.error(`  - api_url ${e}`)
  console.error('\nUpdate api_url in src/implementationConfig.ts and re-run.\n')
  process.exit(1)
}

console.log(`[check-api-url] OK — api_url = "${apiUrl}"`)
