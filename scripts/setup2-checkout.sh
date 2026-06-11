#!/bin/bash
set -euo pipefail

cd /opt/oiko
git fetch origin master
git clean -fd
git checkout -B master origin/master
echo "REPO READY"
