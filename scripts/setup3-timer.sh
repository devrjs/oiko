#!/bin/bash
set -euo pipefail

systemctl daemon-reload
systemctl enable oiko-deploy.timer
systemctl restart oiko-deploy.timer
systemctl status oiko-deploy.timer --no-pager | head -10
echo "TIMER OK"
