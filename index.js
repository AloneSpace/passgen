#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const log = console.log
const createPassword = require('./utils/createPassword')
const savePassword = require('./utils/savePassword')

program.version('1.0.1').description('Simple Password Generator')

program
  .option('-l, --length <number>', 'length of password', '8')
  .option('-s, --save', 'save password to passwords.txt')
  .option('-nn, --no-numbers', 'remove numbers')
  .option('-ns, --no-symbols', 'remove symbols')
  .option('-th, --thai', 'support all thai')
  .option('-th-a, --thai-alpha', 'add thai alphabet')
  .option('-th-d, --thai-digit', 'add thai digit')
  .parse()

const { length, save, numbers, symbols, thai, thai_a, thai_d } = program.opts()

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols, thai, thai_a, thai_d)

// Save to file
if (save) {
  savePassword(generatedPassword)
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword)

// Output generated password
log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword))
log(chalk.yellow('Password copied to clipboard'))
