#!/bin/bash

# Script to register services for startup
# Services: launch_wizard and compiler_explorer

set -e

SERVICE_DIR="/etc/systemd/system"
SCRIPT_DIR="/opt/CE_for_embededd/utils"
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
#install nvm
#type curl >> corrio
#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash 2>> corrio
# Create systemd service for launch_wizard
sudo tee $SERVICE_DIR/launch-wizard.service > /dev/null <<EOF
[Unit]
Description=Launch Wizard Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=$SCRIPT_DIR/launch_wizard.sh
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Create systemd service for compiler_explorer
sudo tee $SERVICE_DIR/compiler-explorer.service > /dev/null <<EOF
[Unit]
Description=Compiler Explorer Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=$SCRIPT_DIR/compiler_explorer.sh
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now launch-wizard.service
systemctl enable --now compiler-explorer.service
modprobe ch341
