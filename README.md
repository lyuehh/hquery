# hquery [![Build Status](https://secure.travis-ci.org/lyuehh/hquery.png?branch=master)](http://travis-ci.org/lyuehh/hquery)

Parse HTML with jQuery and Lodash in your commnd line.

## Getting Started
Install : `npm install hquery -g`

## Usage

```
Usage: hquery [options] [commands]

Options:
 -p if you use hquery in pipe
 -s if you want parse html string
 -r the javascript code you want to run
 -f the javascript file you want to run
 -l if you want to use plugin, available plugins: table2csv, attr, csv
 -a if you use a plugin, use -a to add arg for the plugin
```

## Examples

```
curl -s https://github.com | hquery -p -r '$("title").html()'
hquery -s '<div id="aa"><p>haha<p></div>' -r '$("#aa").html()'
hquery -r '_.range(1, 10)'
curl -s https://github.com | hquery -p -f a.js
curl -s http://news.mtime.com/2014/01/27/1523487-7.html | hquery -p -l table2csv -a '#newscont table'
curl -s http://news.mtime.com/2014/01/27/1523487-7.html | hquery -p -l attr -a 'body a|href'
curl -s https://news.ycombinator.com/ | hquery -p -l csv -a 'table .title a|text:title,attr:href'
curl -s https://news.ycombinator.com/ | hquery -p -l json -a 'table .title a|text:title,attr:href'
curl -s http://hquery-test.surge.sh/index.html | hquery -p -l json2 -a '.list li;{"title": "a|text", "href":"a|attr:href"}'
```

You can use any valid JavaScript code with jQuery and Underscore to parse HTML and look for something interesting.

## Test

* `brew install jq bats`
* `bats test/*.bats`

## Release History

* 2014-01-16 0.0.1 init
* 2014-02-08 0.0.5 add plugins support, now available table2csv
* 2014-08-12 0.0.7 add attr plugin, see example above
* 2014-08-12 0.0.8 add csv plugin, see example above
* 2015-11-16 0.5.0 add json plugin, add test
* 2015-11-29 0.6.0 add json2 plugin, update test
* 2018-06-03 1.0.0 upgrade cheerio version to 1.0.0-rc.2, use lodash replace underscore

## License
Copyright (c) 2018 lyuehh. Licensed under the MIT license.
