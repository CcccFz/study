# 面试题：查空行

问题：使用Linux命令查询file.txt中空行所在的行号

file1.txt数据准备

```shell
itheima itheima

itcast
123

itheima
```



答案：

```shell
awk '/^$/{print NR}' file1.txt
```

运行效果

![image-20200713081907537](assets/image-20200713081907537.png)

# 面试题：求一列的和

问题：有文件file2.txt内容如下:

```shell
张三 40
李四 50
王五 60
```



使用Linux命令计算第二列的和并输出

```shell
awk '{sum+=$2} END{print "求和: "sum}' file2.txt
```



运行效果

![image-20200713082237986](assets/image-20200713082237986.png)



# 面试题：检查文件是否存在

问题：Shell脚本里如何检查一个文件是否存在？如果不存在该如何处理？

答: 

```shell
if [ -e /root/file1.txt ]; then  echo "文件存在"; else echo "文件不存在"; fi
```

运行效果

![image-20200713082603013](assets/image-20200713082603013.png)



# 面试题：数字排序

问题：用shell写一个脚本，对文本中无序的一列数字排序

cat file3.txt文件内容

```shell
9
8
7
6
5
4
3
2
10
1
```

答

```shell
sort -n file3.txt | awk '{sum+=$1; print $1} END{print "求和: "sum}'
```

运行效果

![image-20200713083045742](assets/image-20200713083045742.png)



# 面试题：搜索指定目录下文件内容

问题：请用shell脚本写出查找当前文件夹（/root）下所有的文本文件内容中包含有字符”123”的文件名称?

答:

```shell
grep -r "123" /root | cut -d ":" -f 1| sort -u
```

运行效果

![image-20200713083912322](assets/image-20200713083912322.png)

# 面试题：批量生成文件名

问题: 批量生产指定数目的文件,文件名采用"纳秒"命名

答: file4.sh

```shell
#!/bin/bash
read -t 30 -p "请输入创建文件的数目:" n
test=$(echo $n | sed 's/[0-9]//g') #检测非数字输入
if [ -n "$n" -a -z "$test" ] #检测空输入
then
        for ((i=0;i<$n;i=i+1 ))
        do
                name=$(date +%N)
                [ ! -d ./temp ] &&  mkdir -p ./temp
                touch "./temp/$name"
                echo "创建 $name 成功!"
        done
        else
                echo "创建失败"
                exit 1
fi
```

运行效果

![image-20200713085107848](assets/image-20200713085107848.png)



# 面试题：批量改名

问题: 将/root/temp目录下所有文件名重命名为"旧文件名-递增数字"?

重命名命令

```shell
rename 旧文件名 新文件名 旧文件所在位置
```

脚本代码file5.sh

```shell
#!/bin/bash
filenames=$(ls /root/temp)
number=1
for name in $filenames
do
        printf "命令前:%s" ${name}
        newname=${name}"-"${number}
        rename $name ${newname} /root/temp/*
        let number++ #每个改名后的文件名后缀数字加1
        printf "重命名后:%s \n" ${newname}
done
```

运行效果

![image-20200713091236973](assets/image-20200713091236973.png)

# 面试题：批量创建用户

问题: 根据users.txt中提供的用户列表,一个名一行, 批量添加用户到linux系统中

已知users.txt数据准备

```shell
user1
user2
```



知识点分析1: 添加用户命令

```shell
useradd 用户名
```

知识点分析2: 设置每个用户密码默认密码

```shell
echo "123456" | passwd --stdin 用户名
```

运行效果

![image-20200713092318381](assets/image-20200713092318381.png)





面试题答案: 脚本代码file6.sh

```shell
#!/bin/bash
ULIST=$(cat /root/users.txt)  ##/root/users.txt  里面存放的是用户名，一个名一行
for UNAME in $ULIST
do
        useradd $UNAME
        echo "123456" | passwd --stdin $UNAME &>/dev/null
        [ $? -eq 0 ] && echo "$UNAME用户名与密码添加初始化成功!"
done
```

运行效果

![image-20200713093129265](assets/image-20200713093129265.png)



# 面试题：筛选单词

问题: 根据给出的数据输出里面单词长度大于3的单词

数据准备

```shell
I may not be able to change the past, but I can learn from it.
```

shell脚本file7.sh

```shell
 echo "I may not be able to change the past, but I can learn from it." | awk -F "[ ,.]" '{for(i=1;i<NF;i++){ if(length($i)>3){print $i}}}'
```

运行效果

![image-20200713101959074](assets/image-20200713101959074.png)



# 面试题：单词及字母去重排序

问题

```dart
1、按单词出现频率降序排序！
2、按字母出现频率降序排序！
```

file8.txt 文件内容

```shell
No. The Bible says Jesus had compassion2 on them for He saw them as sheep without a shepherd. They were like lost sheep, lost in their sin. How the Lord Jesus loved them! He knew they were helpless and needed a shepherd. And the Good Shepherd knew He had come to help them. But not just the people way back then. For the Lord Jesus knows all about you, and loves you too, and wants to help you.
```

按照单词出现频率降序

```shell
awk -F "[,. ]+" '{for(i=1;i<=NF;i++)S[$i]++}END{for(key in S)print S[key],key}' file8.txt |sort -rn|head
```

运行效果

![image-20200713101616727](assets/image-20200713101616727.png)

按照字符出现频率降序前10个

```shell
awk -F "" '{for(i=1;i<=NF;i++)S[$i]++}END{for(key in S)print S[key],key}' file8.txt |sort -rn|head
```

运行效果

![image-20200713101521632](assets/image-20200713101521632.png)

# 面试题：扫描网络内存活主机

问题:  扫描192.168.56.1到192.168.56.254之间ip的是否存活, 并输出是否在线?



服务器ip存活分析

```shell
ping ip地址 -c 2
# 如果ip地址存活发送2个数据包会至少接收返回1个数据包
```

效果如图

![image-20200713021841637](assets/image-20200713021841637.png)

完整脚本代码

```shell
#!/bin/bash
count=0
for i  in 192.168.56.{1..254}
do
    # 使用ping命令发送2个包测试, 并获取返回接收到包的个数
    receive=$(ping $i -c 2|awk 'NR==6{print $4}')
    # 接收返回包大于0 说明主机在线
    if [ ${receive} -gt 0 ]
    then
        echo "${i} 在线"
        ((count+=1))
    else
        echo "${i} 不在线"
    fi

done
echo "在线服务器有:"$count"个"
```

运行效果

![image-20200713021609950](assets/image-20200713021609950.png)

# 面试题：MySQL分库备份

```shell
#!/bin/sh
user=root      #用户名
pass=root      #密码
backfile=/root/mysql/backup #备份路径
[ ! -d $backfile ] && mkdir -p $backfile #判断是否有备份路径
cmd="mysql -u$user -p$pass"  #登录数据库
dump="mysqldump -u$user -p$pass " #mysqldump备份参数
dblist=`$cmd -e "show databases;" 2>/dev/null |sed 1d|egrep -v "_schema|mysql"` #获取库名列表
echo "需要备份的数据列表:"
echo $dblist
echo "开始备份:"
for db_name in $dblist #for循环备份库列表
do
 printf '正在备份数据库:%s' ${db_name}
 $dump $db_name 2>/dev/null |gzip >${backfile}/${db_name}_$(date +%m%d).sql.gz #库名+时间备份打包至指定路径下
 printf ',备份完成\n'
done
echo "全部备份完成!!!"
```

运行效果

![image-20200713032753334](assets/image-20200713032753334.png)

# 面试题：MySQL数据库分库分表备份

```shell
#!/bin/sh
user=root      #用户名
pass=root      #密码
backfile=/root/mysql/backup #备份路径
[ ! -d $backfile ] && mkdir -p $backfile #判断是否有备份路径
cmd="mysql -u$user -p$pass"  #登录数据库
dump="mysqldump -u$user -p$pass " #mysqldump备份参数
dblist=`$cmd -e "show databases;" 2>/dev/null |sed 1d|egrep -v "_schema|mysql"` #获取库名列表
echo "需要备份的数据列表:"
echo $dblist
echo "开始备份:"
for db_name in $dblist #for循环备份库列表
do
 printf '正在备份数据库:%s\n' ${db_name}
 tables=`mysql -u$user -p"$pass" -e "use $db_name;show tables;" 2>/dev/null|sed 1d`
 for j in $tables
  do
    printf '正在备份数据库 %s 表 %s ' ${db_name} ${j}
    $dump -B --databases $db_name --tables $j 2>/dev/null > ${backfile}/${db_name}-${j}-`date +%m%d`.sql
    printf ',备份完成\n'
  done


 printf '数据库 %s 备份完成\n' ${db_name}
done
echo "全部备份完成!!!"
```

运行效果

![image-20200713032458346](assets/image-20200713032458346.png)


