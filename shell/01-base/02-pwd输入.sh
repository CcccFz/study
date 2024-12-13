#!/bin/bash

read -t 5 -sp "Enter pwd:"  pwd1
echo
read -t 5 -sp "Enter pwd again:"  pwd2
printf "\n"
if [ "$pwd1" == "$pwd2" ]
then
    echo "Passwords match"
else
    echo "Passwords do not match"
fi