#!/usr/bin/env bash
# setup-runner.sh — Instala e configura o GitHub Actions Runner no LXC
# Execute como root dentro do servidor

set -euo pipefail

RUNNER_VERSION="2.326.0"
RUNNER_DIR="/opt/actions-runner"
RUNNER_USER="runner"

echo "==> Instalando dependências..."
apt update && apt install -y curl jq sudo

echo "==> Baixando GitHub Actions Runner v${RUNNER_VERSION} (ARM64)..."
mkdir -p "$RUNNER_DIR"
cd "$RUNNER_DIR"
curl -fsSL "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-arm64-${RUNNER_VERSION}.tar.gz" \
  -o actions-runner.tar.gz
tar xzf actions-runner.tar.gz
rm actions-runner.tar.gz

echo "==> Criando usuário 'runner'..."
id -u "$RUNNER_USER" &>/dev/null || useradd -m -d "$RUNNER_DIR" -s /bin/bash "$RUNNER_USER"
usermod -aG docker "$RUNNER_USER"
chown -R "$RUNNER_USER":"$RUNNER_USER" "$RUNNER_DIR"

echo "==> Instalando dependências do runner..."
cd "$RUNNER_DIR"
sudo -u "$RUNNER_USER" ./bin/installdependencies.sh

echo ""
echo "======================================================"
echo "  Runner instalado em $RUNNER_DIR"
echo ""
echo "  AGORA FAÇA:"
echo "  1. No GitHub: Settings > Actions > Runners > New runner"
echo "  2. Copie o TOKEN da página"
echo "  3. Execute como root:"
echo ""
echo "     cd $RUNNER_DIR"
echo "     sudo -u $RUNNER_USER ./config.sh --url https://github.com/SEU_USUARIO/oiko --token SEU_TOKEN"
echo "     sudo -u $RUNNER_USER ./svc.sh install"
echo "     sudo -u $RUNNER_USER ./svc.sh start"
echo ""
echo "  4. Confirme:"
echo "     sudo -u $RUNNER_USER ./run.sh"
echo ""
echo "======================================================"
