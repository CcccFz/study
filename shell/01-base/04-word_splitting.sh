#!/bin/bash

a="a"
b="a b"

[[ $a == $b ]]
echo $?

[ $a == $b ]
echo $?