#!/bin/bash
set -x

sort -k2n,2 1.txt

# 去重
sort -k2n,2 -uk1,2 1.txt
sort -k2n,2 -uk1,2 -o 2.txt 1.txt
sort -k2nr,2 -uk1,2 1.txt

# 多列排序 
sort -t "," -k1,1 -k3nr,3 3.txt