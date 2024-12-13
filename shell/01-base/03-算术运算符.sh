#!/bin/bash

read -p "Enter x, y: " x y
echo "x: $x, y: $y"

echo "x + y = `expr $x + $y`"
echo "x - y = `expr $x - $y`"
echo "y - x = `expr $y - $x`"
echo "x * y = `expr $x \* $y`"
echo "y / x = `expr $y / $x`"
echo "y % x = `expr $y % $x`"
echo "x * ( x + y ) = `expr $x \* \( $x + $y \)`"