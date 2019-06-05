#!/usr/bin/env bash

function exitIfGitWorkingDirty() {
    STATUS=$(git status --porcelain)
    [[ ${STATUS} ]] && echo "You MUST have a clean working directory to continue" && exit 1
}

function setBump() {
    # A little bit weird but this give us the acces to the argument passed to the release command
    # npm_config_argv is the env var provided by yarn which contains the arguments(s) passed to a script
    # then we need node to parse this JSON and
    BUMP=$(echo "console.log(JSON.parse(process.argv[2]).original[1] || '')" | node - ${npm_config_argv})
    [[ ! ${BUMP} ]] && BUMP=--minor
    case ${BUMP} in
        --patch) ;;
        --minor) ;;
        --major) ;;
        *) echo "\"${BUMP}\" is not a valid argument" && exit 1
    esac
}

exitIfGitWorkingDirty
setBump

yarn version ${BUMP}