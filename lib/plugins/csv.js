/*
 * Each plugins must have a run function, and accept $, _ as the first 2 arguments..
 * Example: curl -s https://news.ycombinator.com/ | hquery -p -l csv -a 'table .title a|text:title,attr:href'
 */

function run($, _, el) {
    var e = el.split('|')[0];// el
    var attrs = el.split('|')[1]; // column: text:true,attr:href
    var attrsArr = attrs.split(",");
    var keys = _.map(attrsArr, function(i) {
        return i.split(':')[1];
    });
    var $el = $(e);

    var arr = _.reduce($el, function(memo, i) {
        var o = [];
        _.each(attrsArr, function(j) { // text:title or attr:href
            var ma = j.split(':');
            var m = ma[0];
            var n = ma[1];
            if (m === 'text') {
                o[0] = $(i).text().replace(/,/g, '');
            } else if (m === 'attr') {
                o[1] = $(i).attr(n);
            }
        });
        memo.push(o);
        return memo;
    }, []);

    var str = "";
    str = keys.join(",") + '\n';

    _.each(arr, function(a) {
        str += (a.join(',') + '\n');
    });
    return str;
}

exports.run = run;

