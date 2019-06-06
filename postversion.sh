#!/usr/bin/env bash

function getCurrentBranch() {
    echo $(git for-each-ref --format='%(refname:short)' $(git symbolic-ref -q HEAD))
}

function getCurrentTag() {
    echo "${npm_config_version_tag_prefix}${npm_package_version}"
}

BRANCH=$(getCurrentBranch)
TAG=$(getCurrentTag)

yarn publish --new-version ${npm_package_version} &&
git push --no-verify origin ${TAG} &&
git push --no-verify origin ${BRANCH}
