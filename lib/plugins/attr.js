/*
 * Each plugins must have a run function, and accept $, _ as the first 2 arguments..
 * Example: curl -s http://news.mtime.com/2014/01/27/1523487-7.html | hquery -p -l attr -a 'body a|href'
 */

function run($, _, el) {
    var e = el.split('|')[0];
    var attr = el.split('|')[1];
    var $el = $(e);
    var attrs = _.reduce($el, function(memo, i) {
        memo.push($(i).attr(attr));
        return memo;
    }, []);

    return attrs.join('\n');
}

exports.run = run;

