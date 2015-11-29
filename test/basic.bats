#!/usr/bin/env bats

@test "test basic 1" {
    run bin/cli.js -s '<div id="aa"><p>haha<p></div>' -r '$("#aa").html()'
    [ "$status" -eq 0 ]
    [ "$output" = "<p>haha</p><p></p>" ]
}

@test "test basic 2" {
    run bin/cli.js -r '_.range(1, 3)'
    [ "$status" -eq 0 ]
    [ "$output" = "[ 1, 2 ]" ]
}

@test "test with -f" {
    run bin/cli.js  -f test/a.js
    [ "$status" -eq 0 ]
    [ "$output" = "3" ]
}

@test "test with -r" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -r '$("title").text()')
   [ "$title" = "Hquery test page" ]
}

@test "test with -l table2csv" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -l table2csv -a 'table' | tail -1)
   [ "$title" = "facebook,http://www.facebook.com" ]
}

@test "test with -l csv" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -l csv -a '.list a|text:title,attr:href' | sed -n '2p')
   [ "$title" = "google,http://www.google.com" ]
}

@test "test with -l attr" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -l attr -a 'body a|href' | sed -n '2p')
   [ "$title" = "http://www.twitter.com" ]
}

@test "test with -l json" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -l json -a '.list a|text:title,attr:href' | jq '.[0].title')
   [ "$title" = "\"google\"" ]
}

@test "test with -l json2" {
   title=$(curl -s http://hquery-test.surge.sh/index.html | bin/cli.js -p -l json2 -a '.list li;{"title": "a|text", "href":"a|attr:href"}' | jq '.[0].title')
   [ "$title" = "\"google\"" ]
}

