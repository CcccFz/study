#!/bin/bash
set -x

echo "abc 123 456" | awk '{print $1 "&" $2 "&" $3}'

awk '/root/{print $0}' 1.txt

awk -F: '/root/{print $7}' 1.txt
awk -F ":" '/root/{print $7}' 1.txt
awk '{print "文件名:" FILENAME ",行号:" NR ",列数:" NF ",内容:"$0}' 1.txt
awk '{printf("文件名:%s,行号:%d,列数:%d,内容:%s\n", FILENAME, NR, NF, $0)}' 1.txt

awk 'NR==2{print $0}' 1.txt
awk '/^s/' 1.txt
ls -a | awk '/^1/'

awk -F: '{print $1}' 1.txt
awk -F: '{print $NF}' 1.txt
awk -F: '{print $(NF-1)}' 1.txt
awk -F: '{if(NR>=10 && NR<=20)print $1}' 1.txt
echo "one:two/three" | awk -F[:/] '{print $1$2$3}'
echo -e "abc\nabc" | awk 'BEGIN{print "开始..."} {print $0} END{print "结束..."}'
echo "abc itheima     itcast   21" | awk -v str="" '{for(i=1;i<=NF;i++){str=str$i} print str}'
echo "2.1" | awk -v num=1 '{print num+$0}'
ip a | grep brd | grep inet | head -n 1 | awk '{print $2}'
sed 'G' ../02-sed/1.txt | awk '/^$/{print NR}'