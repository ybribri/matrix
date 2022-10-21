# Matrix - class for two dimension array

> V1.20 : methods for math added. Refer to the function list below.

* Easy as original Javascript prototype functions
* All the same prototype functions of array for two dimensional arrays with adjusted arguments
* Added functions only for this class
<hr style="height: 2px;">

### < Install >
needed only for node.js

```bash
$ npm i class-matrix    
```

### < Use - node.js >
* *common JS*
```javascript
const Matrix = require('class-matrix');
````

* *ESM*
```javascript
import Matrix from 'class-matrix';
```
<hr style="height: 2px;">

### < Use - browser >

* *Link in \<head\> tag*
```html
<script src="./matrix-js-link.min.js"></script>
```

* *import in a module file*
  
```javascript
import { Matrix } from './matrix-js-module.min.js';
```
<hr style="height: 2px;">

## < Methods >

* **INIT & VALUE**

```javascript
new Matrix
.row
.column
getter value
setter value
getValueOf()
setValueOf()   
```
* **CHECK & FIND**

```javascript
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
* **NEW STRUCTURE**

```javascript
concat()
flat()
join()
toString()
slice()
```
* **ITERATE**

```javascript
forEach()
map()
reduce()
reduceRight()
filter()
every()
some()
```
* **CHANGE IN PLACE**

```javascript
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
* **CHANGE IN PLACE**

```javascript
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
* **GENERATOR**

```javascript
keys()
values()
entries()
```

* **MATH**

```javascript
det()
cofactors()
transpose()
adjoint()
inverse()
add()
subtract()
multiply()
divide()
```
  
  
> All the prototype functions are rebuilt for this class.\
> In most cases, an index in callback function is seperated into a row index and a column index\
> Some prototype functions are added only for matrix class

<hr style="height: 2px;">

## < EXAMPLE >
  
```javascript
let matrixA = new Matrix(3,3).fill((el,[i,j])=>i+j);
```
  
| 0 | 1 | 2 |
|---|---|---|
| **1** | **2** | **3** |
| **2** | **3** | **4** |
  
  
```javascript
console.log(matrixA.getValueOf([2,2]));
```

4

  
```javascript
matrixA.setValueOf([2,2],9);
console.log(matrixA.value);
```
  
| 0 | 1 | 2 |
|---|---|---|
| **1** | **2** | **3** |
| **2** | **3** | **9** |
  
  

```javascript
matrixA.value = [[0,1],[2,3],[4,5]];
console.log(matrixA.value);
console.log(`row = ${matrixA.row}, column = ${matrixA.column}`);

// if you set value directly, it would change the structure of the matrix
```
  
| 0 | 1 |
|---|---|
| **2** | **3** |
| **4** | **5** |

row = 2, column = 2
  
  
```javascript
matrixA.forEach((el, [i,j])=>{
    console.log(`[${i},${j}] = ${el}`);
});
```
  
[0,0] = 0  
[0,1] = 1  
[0,2] = 2  
[1,0] = 1  
[1,1] = 2  
[1,2] = 3  
[2,0] = 2  
[2,1] = 3  
[2,2] = 4  
  
## [Click here for more details of each methods!](https://ybrians.cafe24.com/matrix/)
