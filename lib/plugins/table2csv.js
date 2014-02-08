/*
 * Each plugins must have a run function, and accept $, _ as the first 2 arguments..
 *
 */

function run($, _, el) {
    var $table = $(el);
    var $head = $table.find('tr').eq(0);
    var $body = _.toArray($table.find('tr')).slice(1);

    var t = [];
    _.toArray($head.children()).forEach(function(i) {
        t.push($(i).text().replace(/\n|\r/g, ''));
    });

    var c = [];
    $body.forEach(function(i) {
        var item = [];
        _.toArray($(i).children()).forEach(function(j) {
            item.push($(j).text().replace(/\n|\r/g, ''));
        });
        if (item[0] !== '') {
            c.push(item.join(','));
        }
    });

    return t.join(',') + '\n' + c.join('\n');
}

exports.run = run;

