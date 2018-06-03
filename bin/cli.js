#!/usr/bin/env node

var argv = require('optimist').argv;
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require('lodash');

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
    console.log(' -l if you want to use plugin, available plugins: table2csv');
    console.log(' -a if you use a plugin, use -a to add arg for the plugin');
    console.log('');
    console.log('Examples: ');
    console.log('curl -s https://github.com | hquery -p -r \'$("title").html()\' ');
    console.log('hquery -s \'<div id="aa"><p>haha<p></div>\' -r \'$("#aa").html()\'');
    console.log('hquery -r \'_.range(1, 10)\'');
    console.log('curl -s https://github.com | hquery -p -f a.js');
    console.log('curl -s http://news.mtime.com/2014/01/27/1523487-7.html | hquery -p -l table2csv -a \'#newscont table\'');
    console.log('curl -s https://news.ycombinator.com/ | hquery -p -l csv -a \'table .title a|text:title,attr:href\'');
    console.log('curl -s http://news.mtime.com/2014/01/27/1523487-7.html | hquery -p -l attr -a \'body a|href\'')
    console.log('curl -s https://news.ycombinator.com/ | hquery -p -l json -a \'table .title a|text:title,attr:href\'');
    console.log('curl -s http://hquery-test.surge.sh/index.html | hquery -p -l json2 -a \'.list li;{"title": "a|text", "href":"a|attr:href"}\'');
    process.exit(0);
}

if (argv.h || (!argv.r && !argv.f && !argv.l)) {
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
    $ = cheerio.load(str);

    var command;
    if (argv.r) {
        command = argv.r;
    } else if (argv.f) {
        command = fileContent;
    } else if (argv.l) {
        command = require('../lib/plugins/' + argv.l).run;
        if (argv.a) {
            if (argv.l === 'json' || argv.l === 'json2') {
                console.log(JSON.stringify(command($, _, argv.a), null, 2));
            } else {
                console.log(command($, _, argv.a));
            }
        } else {
            console.log(command());
        }
        process.exit(0);
    }
    if (argv.f) {
        eval(command);
    } else {
        console.log(eval(command));
    }
}
