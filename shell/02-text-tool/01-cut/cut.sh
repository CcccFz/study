#!/bin/bash
set -x

# 列
cut 1.txt -d " " -f 1
cut 1.txt -d " " -f 1,3
cut 1.txt -d " " -f 2-4
cut 1.txt -d " " -f 2-
cut 1.txt -d " " -f -3

# 字符
cut 1.txt -c 1-5

# 管道
ps aux | grep zsh | head -n 1 | cut -d " " -f 7