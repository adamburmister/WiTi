#!/usr/bin/env bash

# Allow access to the internet for a passed in MAC address
# allow-access.sh "aa:bb:cc:dd:ee"

IPTABLES=/sbin/iptables

echo "Allowing internet access for $1" >> /var/log/WiTi/iptables-access

$IPTABLES -t mangle -I internet 1 -m mac --mac-source $1 -j RETURN
