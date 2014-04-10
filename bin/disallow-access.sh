# Disallow internet access for a MAC address

IPTABLES=/sbin/iptables

$IPTABLES -D internet -t mangle -m mac --mac-source $1 -j RETURN
