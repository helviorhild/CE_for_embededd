#!/bin/bash
#modprobe vhci-hcd
if [[ -z $1 ]]; then
echo "USAGUE: usbip.sh  <IP DE ORIGUEN (defecto 10.0.2.2)>"
host=10.0.2.2
else
host=$1 
fi
usbip list -r $host  | grep -Eo '[0-9]+-[0-9]+' | while read dev; do
	usbip attach -r $host -b $dev
done
/usr/bin/stty -F /dev/ttyUSB0 1200 #hago reset del arduino para que se pueda programar
