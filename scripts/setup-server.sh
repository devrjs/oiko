#!/bin/bash
set -euo pipefail

echo "=== [1/5] Adding github.com to known hosts ==="
ssh-keyscan -H github.com >> ~/.ssh/known_hosts 2>/dev/null

echo "=== [2/5] Setting up repository ==="
cd /opt/oiko
if [ ! -d .git ]; then
    git init
    git remote add origin git@github.com:devrjs/oiko.git
fi
git fetch origin master
git checkout -B master origin/master

echo "=== [3/5] Installing systemd timer ==="
cp scripts/oiko-deploy.service /etc/systemd/system/
cp scripts/oiko-deploy.timer  /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now oiko-deploy.timer
systemctl status oiko-deploy.timer --no-pager | head -5

echo "=== [4/5] First deployment ==="
chmod +x scripts/auto-deploy.sh
bash scripts/auto-deploy.sh

echo "=== [5/5] Setup complete ==="
