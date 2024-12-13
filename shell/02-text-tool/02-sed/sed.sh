#!/bin/bash
set -x

# add
sed '3ahello' 1.txt
sed '3ihello' 1.txt
sed '/itheima/ahello' 1.txt
sed '$ahello' 1.txt

# del
sed '2d' 1.txt
sed '1d;4d' 1.txt
sed '1~2d' 1.txt
sed '1,3d' 1.txt
sed '1,3!d' 1.txt
sed '$d' 1.txt
sed '/itheima/d' 1.txt
sed '/itheima/,$d' 1.txt
sed '/itheima/,+1d' 1.txt
sed '/itheima\|itcast/!d' 1.txt

# update
sed '1chello' 1.txt
sed '/itheima/chello' 1.txt
sed '$chello' 1.txt
sed 's/itheima/hello/' 1.txt
sed 's/itheima/hello/g' 1.txt
sed 's/itheima/hello/2' 1.txt
sed -n 's/itheima/hello/2p' 1.txt > 2.txt
sed '/i/s/t.*//g' 1.txt
sed 's/$/& test/' 1.txt
sed 's/^/#/' 1.txt

# get
sed -n '/itcast/p' 1.txt
ps aux | sed -n '/sshd/p'

# multi
sed -e '1d' -e '/itheima/citcast' 1.txt
sed '1d;/itheima/citcast' 1.txt

# 缓存区数据交换
sed '1h;$G' 1.txt
sed '1{h;d};$G' 1.txt
sed '1h;2,$g' 1.txt
sed '1,3H;$G' 1.txt
sed -i 'G' 1.txt
sed -i '/^$/d' 1.txt