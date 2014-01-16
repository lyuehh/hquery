# hquery [![Build Status](https://secure.travis-ci.org/lyuehh/hquery.png?branch=master)](http://travis-ci.org/lyuehh/hquery)

jQuery for html in command line

## Getting Started
Install : `npm install hquery -g`

## Usage

`hquery -s html_string -e css_selecters -c jquery_methods`<br/>
or as pipe:
`curl -s http://lyuehh.com | hquery -e "h1" -c ".text()"`

## Examples

`$ hquery -s "<div id="aa">html string</div>" -e "#aa" -c ".text()"`

`html string`

`$ curl -s http://lyuehh.com | hquery -e "h1" -c ".text()"`

`Hi, welcome.`

You can use any css selecters and almost any jQuery methods to find what you are looking for in the html string.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2014-01-16 init

## License
Copyright (c) 2014 lyuehh. Licensed under the MIT license.
