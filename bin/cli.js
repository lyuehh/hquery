#!/usr/bin/env node

var argv = require('optimist').argv;
var jsdom = require('jsdom');
var fs = require('fs');
var path = require('path');

var jquery = fs.readFileSync(path.resolve(path.dirname(__dirname) + '/lib/jquery-2.0.3.js'), 'utf8');

var str = '';

function printUsage() {
    console.log('Usage: hquery -s "<div id=aa>html string</div>" -e "#aa" -c ".text()" ');
    console.log(' curl -s http://lyuehh.com | hquery -e "h1" -c ".text()"');
    process.exit(0);
}

if (!argv.e || !argv.c || argv.h) {
    printUsage();
}

if (!argv.s) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
        str += chunk;
    });

    process.stdin.on('end', function() {
        run(str);
    });

    process.stdin.on('error', function(err) {
        throw err;
    });
} else {
    run(argv.s);
}

function run(str) {
    if (!str) {
        throw 'no string to parse, check your url or argv';
    }
    jsdom.env({html: str,  src: [jquery], done: function(err, window) {
        var $ = window.$;
        var command = '$("'+ argv.e +'")' + argv.c;
        console.log(eval(command));
    }});
}
