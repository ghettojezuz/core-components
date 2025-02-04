#!/bin/bash

set -e

git config lfs.allowincompletepush true

# Релизим рут-пакет с помощью semantic-release
semantic_output=$(yarn semantic-release --debug)

# Выводим логи семантика
echo $semantic_output

# Проверяем, что semantic-release зарелизил рут-пакет (пока не знаю, как это можно сделать по-другому)
if [[ $semantic_output =~ "Publishing version" ]]
then
    git remote set-url origin https://core-ds-bot:$GITHUB_TOKEN@github.com/core-ds/core-components.git
    git checkout master
    git pull origin master --rebase
    git fetch --tags

    if [ -z $(lerna changed) ]
    then
        echo "There are no relevant changes, so no new versions are released."
    else
        lerna version --conventional-commits --no-commit-hooks --yes --force-git-tag
        git push origin master

        # Копируем package.json в dist после того как подняли версию пакета, чтобы опубликовалась актуальная версия.
        lerna exec -- yarn copyfiles package.json dist
        lerna publish from-git --yes
    fi
else
    exit 0
fi
