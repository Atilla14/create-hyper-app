#!/usr/bin/env node

const argv = require('yargs').argv

if (argv.test && argv.say) {
    console.log("yyou are testing and wanted to say " + argv.say)
} else {
    console.log("not testing")
}
