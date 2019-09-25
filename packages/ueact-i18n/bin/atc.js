#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const build = require('../lib/build');
const replace = require('../lib/replace');
const combine = require('../lib/combine-excels');

program
  .version(pkg.version)
  .usage('<command> [directory path | file path]')
  
program
  .command('build')
  .description('extract chinese literal from project and generate a excel')
  .action(function(env, options) {
    build();
  });

program
  .command('replace')
  .description('replace chinese literal to i18(key)')
  .action(function(env, options) {
    replace();
  });

program
  .command('combine')
  .description('combine mulit excel file into a total one')
  .action(function(env) {
    const folder = process.cwd();
    combine(folder);
  });
  
program.parse(process.argv);
