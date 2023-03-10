#!/bin/bash

# create a vairable to hold a passed in argument
# this argument is the next release version
# this is passed in from the .releaserc file

sudo apt-get install -y jq

nextReleaseVersion=$1
TARGET_KEY="version"

printf "Next version: ${nextReleaseVersion}\n"

# This script is used to execute the prepareCMD.sh script on the remote host
printf "Executing prepareCMD.sh on remote host \n"

printf "Update the version in the package.json file \n"

# make a temp file
tmp=$(mktemp)

jq --arg a "$nextReleaseVersion" '.version = $a' ./GUI/ETVR/package.json > "$tmp" && mv "$tmp" ./GUI/ETVR/package.json -f

printf "Update the version in the tauri.conf.json file \n"

jq --arg a "$nextReleaseVersion" '.version = $a' ./GUI/ETVR/src-tauri/tauri.conf.json > "$tmp" && mv "$tmp" ./GUI/ETVR/src-tauri/tauri.conf.json -f

printf "Update the version in the Cargo.toml file \n"

sed -i "s/version = \"[0-9\\.]*\"/version = \"${nextReleaseVersion}\"/g" ./GUI/ETVR/src-tauri/Cargo.toml

printf "[prepareCMD.sh]: Done \n"