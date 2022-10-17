# Matrix - class for two dimension array 

* Easy as original Javascript prototype functions
* All the same prototype functions of array for two dimensional arrays width adjusted arguments for 2D arrays.
* Added functions only for this class

### How to use
```
<node.js>
$ npm i class-matrix

const Matrix = require('./matrix-js-node');

<HTML file>
<script src="./matrix-js-link.min.js"></script>

<Javascript module>
import { Matrix } from './matrix-js-module.min.js';

```

* DECLARE

```

let myMatrix = new Matrix(5,5);

```
### INIT & VALUE
```
new Matrix
getter value
setter value
getValueOf()
setValueOf()
```
### CHECK & FIND
```
Matrix.isMatrix()
at()
find()
findLast()
findIndex()
findLastIndex()
indexOf()
lastIndexOf()
includes()
```
### NEW STRUCTURE
```
concat()
flat()
join()
toString()
slice()
```
### ITERATE
```
forEach()
map()
reduce()
reduceRight()
filter()
every()
some()
```
### CHANGE IN PLACE
```
fill()
pop()
push()
shift()
unshift()
splice()
sort()
reverse()
copyWithin()
```
### CHANGE IN PLACE
```
fill()
pop()
push()
shift()
unshift()
splice()
sort()
reverse()
copyWithin()
```
### GENERATOR
```
keys()
values()
entries()
```
> ** All the prototype functions are rebuilt for this class.

> ** In most cases, an index in callback function is seperated into a row index and colum index

> ** a few prototype functions are added only for matrix class.

### EXAMPLE
```
    let matrixA = new Matrix(3,3).fill((el,[i,j])=>i+j);

    0   1   2
    1   2   3
    2   3   4

    matrixA.forEach((el, [i,j])=>{
        console.log(`[${i},${j}] = ${el}`);
    });

    [0,0] = 0
    [0,1] = 1
    [0,2] = 2
    [1,0] = 1
    [1,1] = 2
    [1,2] = 3
    [2,0] = 2
    [2,1] = 3
    [2,2] = 4
```
* [for more details of each functions](https://ybrians.cafe24.com/matrix/)
