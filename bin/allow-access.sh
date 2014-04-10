#!/usr/bin/env bash

# Allow access to the internet for a passed in MAC address

IPTABLES=/sbin/iptables

echo "Allowing internet access for $1"

$IPTABLES -t mangle -I internet 1 -m mac --mac-source $1 -j RETURN