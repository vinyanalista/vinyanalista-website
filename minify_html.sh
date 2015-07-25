#!/bin/bash
# minify_html.sh
if test $# -ne 2
then
    echo "usage: sh minify_html.sh sourcedir destdir";
    exit 1;
fi

set -xv

for FOLDER in `find $1 -type d`
do
    mkdir -p "$2/${FOLDER#$1}";
done

for HTML_FILE in `find $1 -type f -name "*.html"`
do
    html-minifier --remove-comments -o "$2/${HTML_FILE#$1}" "$HTML_FILE";
done

for ASSET in `find $1 -type f ! -name "*.html"`
do
    cp "$ASSET" "$2/${ASSET#$1}";
done