@ECHO off
git stash
:: http://stackoverflow.com/a/2340018
FOR /f %%i IN ('git rev-parse HEAD') DO SET HASH_DO_COMMIT_ATUAL=%%i
CALL jekyll build
CD ../vinyanalista.github.io/
git rm -rf *
:: http://stackoverflow.com/a/4267994
COPY /y NUL .nojekyll
:: http://stackoverflow.com/a/31015007
robocopy ../vinyanalista-website/_site/ . /s /e
:: http://stackoverflow.com/a/1257613
:: http://stackoverflow.com/a/1580644
:: http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/
:: https://help.github.com/articles/dealing-with-line-endings/
git -c core.autocrlf=true -c core.filemode=false add --all .
git commit -m "Atualização do site (ver commit %HASH_DO_COMMIT_ATUAL% do repositório vinyanalista-website)"
git push
CD ../vinyanalista-website/
git stash apply
PAUSE