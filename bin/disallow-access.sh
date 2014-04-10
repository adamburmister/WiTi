#!/usr/bin/env bash

# Disallow internet access for a MAC address
# disallow-access.sh "aa:bb:cc:dd:ee"

IPTABLES=/sbin/iptables

echo "Disallowing internet access for $1"

$IPTABLES -D internet -t mangle -m mac --mac-source $1 -j RETURN
