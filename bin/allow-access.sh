# Allow access to the internet for a passed in MAC address

IPTABLES=/sbin/iptables

$IPTABLES -t mangle -I internet 1 -m mac --mac-source $1 -j RETURN