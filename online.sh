#!/bin/bash
git stash
HASH_DO_COMMIT_ATUAL=`git rev-parse HEAD`
jekyll build
cd ../vinyanalista.github.io/
git rm -rf *
touch .nojekyll
sh minify_html.sh ../vinyanalista-website/_site .
git add --all .
git commit -m "Atualização do site (ver commit $HASH_DO_COMMIT_ATUAL do repositório vinyanalista-website)"
git push
cd ../vinyanalista-website/
git stash apply