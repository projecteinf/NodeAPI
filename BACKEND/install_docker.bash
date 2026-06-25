#!/bin/bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
docker ps
sudo docker ps
grep docker /etc/group
sudo usermod -aG docker isard
groups isard
