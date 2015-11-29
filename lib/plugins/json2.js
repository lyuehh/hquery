
/*
 * Each plugins must have a run function, and accept $, _ as the first 2 arguments..
 * Example: curl -s https://news.ycombinator.com/ | hquery -p -l json -a 'table .title a|text:title,attr:href'
 * 'table;{ "title": ".title a|text", "url": ".title a|attr:href"}'
 * '.list;{"title": "a|text", "href":"|attr:href"}'
 */

function run($, _, str) {
    var el = str.split(';')[0];// el
    // var attrs = str.split('|')[1]; // column: text:title,attr:href
    // var attrsArr = attrs.split(",");
    // var keys = _.map(attrsArr, function(i) {
    //     return i.split(':')[1];
    // });
    var $el = $(el);
    var obj = JSON.parse(str.split(';')[1]);

    var arr = _.reduce($el, function(memo, i) {
        var o = {};
        _.each(obj, function(v, k) {
            var vArr = v.split('|');
            if (vArr[1] === 'text') {
                o[k] = strip($(i).find(vArr[0]).text())
            } else {
                var attrArr = vArr[1].split(':');
                if (attrArr[0] === 'attr') {
                    o[k] = strip($(i).find(vArr[0]).attr(attrArr[1]))
                }
            }
        })
        memo.push(o);
        return memo;
    }, []);

    return arr;
}

function strip(str) {
    // return str.trim().replace(/\s/, '');
    str || (str = '')
    return str.trim().replace(/\t|\r|\n/g, '');
}

exports.run = run;

