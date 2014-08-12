# hquery [![Build Status](https://secure.travis-ci.org/lyuehh/hquery.png?branch=master)](http://travis-ci.org/lyuehh/hquery)

Parse HTML with jQuery and Underscore in your commnd line.

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
 -l if you want to use plugin, available plugins: table2csv
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
```

You can use any valid JavaScript code with jQuery and Underscore to parse HTML and look for something interesting.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2014-01-16 0.0.1 init
* 2014-02-08 0.0.5 add plugins support, now available table2csv
* 2014-08-12 0.0.7 add attr plugin, see example above

## License
Copyright (c) 2014 lyuehh. Licensed under the MIT license.
