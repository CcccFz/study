#!/bin/bash
# set -x

awk '/^$/{print NR}' 13.txt
awk '{sum+=$2} END{print "求和: " sum}' 14.txt
if [ -e file.txt ]; then echo "存在"; else echo "不存在"; fi
sort -k1n,1 16.txt
grep -r "123" 17 | cut -d: -f 1 | sort -u  # grep -rl "123" 17

while :
do
  :
done
