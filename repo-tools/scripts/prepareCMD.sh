#!/bin/bash

# create a vairable to hold a passed in argument
# this argument is the next release version
# this is passed in from the .releaserc file
nextReleaseVersion=$1

# This script is used to execute the prepareCMD.sh script on the remote host
printf "Executing prepareCMD.sh on remote host \n"

printf "Update the version in the package.json file \n"
sed -i "s/\"version\": \"[0-9\\.]*\",/\"version\": \"\\$nextReleaseVersion\",/g" ./GUI/ETVR/package.json

printf "Update the version in the tauri.conf.json file \n"
sed -i "s/\"version\": \"[0-9\\.]*\",/\"version\": \"\\$nextReleaseVersion\",/g" ./GUI/ETVR/src-tauri/tauri.conf.json

printf "Update the version in the Cargo.toml file \n"
sed -i "s/version = \"[0-9\\.]*\"/version = \"\\$nextReleaseVersion\"/g" ./GUI/ETVR/src-tauri/Cargo.toml

printf "[prepareCMD.sh]: Done \n"