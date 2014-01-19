#!/usr/bin/env node

var argv = require('optimist').argv;
var jsdom = require('jsdom');
var fs = require('fs');
var path = require('path');

var jquery = fs.readFileSync(path.resolve(path.dirname(__dirname) + '/lib/jquery-2.0.3.js'), 'utf8');
var underscore = fs.readFileSync(path.resolve(path.dirname(__dirname) + '/lib/underscore-1.5.2.js'), 'utf8');

if (argv.f) {
    var fileContent = fs.readFileSync('./' + argv.f, 'utf8');
}

var str = '';

function printUsage() {
    console.log('Usage: hquery [options] [commands]');
    console.log('');
    console.log('Options: ');
    console.log(' -p if you use hquery in pipe');
    console.log(' -s if you want parse html string');
    console.log(' -r the javascript code you want to run');
    console.log(' -f the javascript file you want to run');
    console.log('');
    console.log('Examples: ');
    console.log('curl -s https://github.com | hquery -p -r \'$("title").html()\' ');
    console.log('hquery -s \'<div id="aa"><p>haha<p></div>\' -r \'$("#aa").html()\'');
    console.log('hquery -r \'_.range(1, 10)\'');
    console.log('curl -s https://github.com | hquery -p -f a.js');
    process.exit(0);
}

if (argv.h || (!argv.r && !argv.f)) {
    printUsage();
}

if (argv.p) {
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

    if (argv.p && !str) {
        throw 'no string to parse, check your url or your command';
    }
    if (!argv.p && !argv.s) {
        str = '<div><div>';
    }
    jsdom.env({html: str,  src: [jquery, underscore], done: function(err, window) {
        if (err) {
            throw err;
        }
        var $ = window.$;
        var _ = window._;
        var command;
        if (argv.r) {
            command = argv.r;
        } else if (argv.f) {
            command = fileContent;
        }
        eval(command);
    }});
}
