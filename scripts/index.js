const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '../lib/node/index.js')

let content = fs.readFileSync(filePath, 'utf-8')

content = content.replace(/\.ts('|")/gm, '.js$1')

fs.writeFileSync(filePath, content)
