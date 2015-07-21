#!/bin/sh
CLOSURE_COMPILER=~/compiler.jar

SCRIPTS_FOLDER="js"
MIN_SCRIPT="all.min.js"
SOURCE_MAP="all.min.js.map"

cd $SCRIPTS_FOLDER

java -jar $CLOSURE_COMPILER \
    --js "../lib/jquery/1.11.3/jquery-1.11.3.js" \
    --js "../lib/bootstrap/3.3.4/js/bootstrap.js" \
    --js "../lib/bootstrap/3.3.4/js/ie10-viewport-bug-workaround.js" \
    --js "../js/comum.js" \
    --js "../js/adsense.js" \
    --js_output_file "$MIN_SCRIPT" --create_source_map "$SOURCE_MAP"
echo "//# sourceMappingURL=$SOURCE_MAP" >> "$MIN_SCRIPT"