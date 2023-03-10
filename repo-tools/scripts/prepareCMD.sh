#!/bin/bash

# create a vairable to hold a passed in argument
# this argument is the next release version
# this is passed in from the .releaserc file

sudo apt-get install -y jq

nextReleaseVersion=$1
TARGET_KEY="version"

# parse all letters a-z and A-Z and replace with nothing
# this will remove all letters from the version string
# this is to ensure that the version string is a valid semver

# check if there is a letter in the version string
# if there is a letter, then remove it
# if there is no letter, then do nothing
if [[ $nextReleaseVersion =~ [a-zA-Z] ]]; then
    nextReleaseVersion=$(echo $nextReleaseVersion | sed 's/[a-zA-Z]//g')
    
    # check if there is a dash in the version string
    # if there is a dash, then replace it with a dot
    # if there is no dash, then do nothing
    if [[ $nextReleaseVersion =~ "-" ]]; then
        # parse all dashes and replace with dots
        # this is to ensure that the version string is a valid semver
        nextReleaseVersion=$(echo $nextReleaseVersion | sed 's/-/./g')
        
        # remove everything after the third dot and the dot itself
        # this is to ensure that the version string is a valid semver
        nextReleaseVersion=$(echo $nextReleaseVersion | sed 's/\.[0-9]*$//g')
        # remove the last dot
        nextReleaseVersion=$(echo $nextReleaseVersion | sed 's/\.$//g')
    fi
fi

# print the next release version

printf "Next version: ${nextReleaseVersion}\n"

# This script is used to execute the prepareCMD.sh script on the remote host
printf "Executing prepareCMD.sh on remote host \n"

printf "Update the version in the package.json file \n"

# make a temp file
tmp=$(mktemp)

jq --arg a "$nextReleaseVersion" '.version = $a' ./GUI/ETVR/package.json > "$tmp" && mv "$tmp" ./GUI/ETVR/package.json -f

printf "Update the version in the tauri.conf.json file \n"

jq --arg a "$nextReleaseVersion" '.package.version = $a' ./GUI/ETVR/src-tauri/tauri.conf.json > "$tmp" && mv "$tmp" ./GUI/ETVR/src-tauri/tauri.conf.json -f

#printf "Update the version in the Cargo.toml file \n"
#
#sed -i "s/version = \"[0-9\\.]*\"/version = \"${nextReleaseVersion}\"/g" ./GUI/ETVR/src-tauri/Cargo.toml

# Install the dependencies for toml file
printf "Install the dependencies for the toml file \n"

sudo apt install python3-pip
pip3 install yq

export PATH="~/.local/bin:$PATH"
source ~/.bashrc

tmp=$(mktemp)
tomlq -t --arg version "$nextReleaseVersion" '.package.version |= $version' ./GUI/ETVR/src-tauri/Cargo.toml > "$tmp" && mv "$tmp" ./GUI/ETVR/src-tauri/Cargo.toml -f

printf "[prepareCMD.sh]: Done \n"



# [package]
# name = "etvr"
# version = "0.1.0"

# q: can you modify the version parameter in a toml file that looks like the above?
# a: yes, you can use sed to modify the version parameter in a toml file that looks like the above
#    the command is: sed -i "s/version = \"[0-9\\.]*\"/version = \"${nextReleaseVersion}\"/g" ./GUI/ETVR/src-tauri/Cargo.toml
