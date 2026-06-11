#!/bin/bash
set -euo pipefail

# Configure SSH for github.com
cp ~/.ssh/config_github ~/.ssh/config 2>/dev/null || cat ~/.ssh/config_github >> ~/.ssh/config
chmod 600 ~/.ssh/config
echo "SSH config done"

# Add github.com to known hosts
ssh-keyscan -H github.com >> ~/.ssh/known_hosts 2>/dev/null
echo "Known hosts done"

# Clone/pull the repo
cd /opt/oiko
if [ ! -d .git ]; then
    git init
    git remote add origin git@github.com:devrjs/oiko.git
fi
git fetch origin master
git checkout -B master origin/master
echo "Repo ready"
