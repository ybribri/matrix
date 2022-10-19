class Matrix {
    "use strict"
    #matrix;

    constructor(x, y) {
        if (x==undefined || y==undefined) return undefined;
        this.row = x;
        this.column = y;
        this.#matrix = Array.from({length: this.row}, () => Array.from({ length: this.column}, () => null));
    }

    get value () {
        return this.#matrix;
    }

    set value (v) {
        if (Array.isArray(v)) {
            this.#matrix = v;
            this.row = this.#matrix.length;
            this.column = this.#matrix[0].length;
        }
    }
    
    getValueOf(at=[0,0]) {
        const [f, s] = this.#reIndexAt(at);
        if (f<0 || f>this.row-1) return undefined;
        if (s<0 || s>this.#matrix[f].length-1) return undefined;
        return this.#matrix[f][s];
    }

    setValueOf(at=[0,0],v) {
        if (!Array.isArray(at)) { v=at; at=[0,0]; }
        const [f, s] = this.#reIndexAt(at);
        if (f<0) return undefined;
        if (s<0) return undefined;
        if (v==undefined) {
            console.log(`value is missing.`);
            return undefined;
        }
        this.#matrix[f][s] = v;
    }

    static isMatrix(matrix) {
        return matrix instanceof this;
    }

    fill(fn=null, from=[0,0], to=[this.row-1,this.#matrix[this.row-1].length]) {
        const [sx, sy] = this.#reIndex(from);
        const [ex, ey] = this.#reIndexTo(to);
        if (sx>this.row || sx>ex ||(ex==sx && sy>=ey)) return this.#matrix;
        if (ex<0 || ey<0) return this.#matrix;
        for(let i=sx; i<=ex; i++) {
            for(let j=(i==sx?sy:0); j<(i==ex?ey:this.#matrix[i].length); j++) {
                this.#matrix[i][j] = (typeof fn == 'function') ? fn(this.#matrix[i][j], [i,j], this.#matrix) : fn;
            }
        }
        let newMatrix = new Matrix(this.#matrix.length, this.#matrix[0].length);
        newMatrix.value = this.#matrix;
        return newMatrix;        
    }

    reverse(dir='colrow') {
        if (dir.includes('col')) this.#matrix = this.#matrix.map(u => u.map((v,j) => u[u.length-1-j]));
        if (dir.includes('row')) this.#matrix = this.#matrix.map((u, i)=>this.#matrix[this.#matrix.length-1-i]);
        let newMatrix = new Matrix(this.#matrix.length, this.#matrix[0].length);
        newMatrix.value = this.#matrix;
        return newMatrix;
    }

    sort(fn, dir='row') {
        if (dir!=='col' && dir!=='row') return this.#matrix;
        if (dir=='col') this.#matrix = this.#matrix.map(u => u.sort(fn));
        if (dir=='row') {
            let temp = this.#matrix.flat();
            temp = temp.sort(fn);
            let row = [];
            let tempArr= [];
            temp.forEach((u, i)=>{
                row.push(u);
                if ((i+1)%(this.#matrix[0].length)==0) {
                    tempArr.push(row);
                    row=[];
                }
            });
            this.#matrix = tempArr;
        }
        let newMatrix = new Matrix(this.#matrix.length, this.#matrix[0].length);
        newMatrix.value = this.#matrix;
        return newMatrix;
    }

    map(fn, arg) {
        if (fn==undefined) { console.log('undefined is not a function'); return undefined; }
        if (arg!==undefined) fn = fn.bind(arg);
        let temp = this.#matrix.map((row, i) => row.map((col, j) => fn(col, [i, j], this.#matrix)));
        let newMatrix = new Matrix(temp.length, temp[0].length);
        newMatrix.value = temp;
        return newMatrix;
    }

    filter(fn, arg) {
        if (fn==undefined) { console.log('undefined is not a function'); return undefined; }
        if (arg!==undefined) fn = fn.bind(arg);
        let temp = this.#matrix.map((row, i) => row.map((col, j) => fn(col, [i, j], this.#matrix)==true?col:null));
        temp = temp.flat(2).filter(el => el!==null);
        let tempArr= [];
        if (temp.length>0) { 
            let r = [];
            temp.forEach((u, i)=>{
                r.push(u);
                if ((i+1)%this.column==0 || i==temp.length-1) {
                    tempArr.push(r);
                    r=[];
                }
            });            
        }
        let newMatrix = new Matrix(tempArr.length, tempArr[0].length);
        newMatrix.value = tempArr;
        return newMatrix;
    }

    forEach(fn, arg) {
        if (fn==undefined) { console.log('undefined is not a function'); return undefined; }
        if (arg!==undefined) fn = fn.bind(arg);
        this.#matrix.forEach((row, i) => row.forEach((col, j) => fn(col, [i, j], this.#matrix)));
    }

    flat(d=1) {
        let newMatrix = new Matrix(this.#matrix.length, this.#matrix[0].length);
        newMatrix.value = this.#matrix.map(row => {
            return row.flat(d)
        });
        return newMatrix;
    }

    find(fn, arg) {
        if (fn==undefined) { console.log('undefined is not a function'); return undefined; }
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=0; i<this.#matrix.length; i++) {
            for(let j=0; j<this.#matrix[i].length; j++) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===true) { return this.#matrix[i][j]; }
            }
        }
        return undefined;
    }

    findIndex(fn, arg) {
        if (fn==undefined) { console.log('function is missing.'); return undefined; }
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=0; i<this.#matrix.length; i++) {
            for(let j=0; j<this.#matrix[i].length; j++) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===true) { return [i, j]; }
            }
        }
        return [-1, -1];
    }
    
    findLast(fn, arg) {
        if (fn==undefined) return undefined;
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=this.#matrix.length-1; i>=0; i--) {
            for(let j=this.#matrix[i].length-1; j>=0; j--) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===true) { return this.#matrix[i][j]; }
            }
        }
        return undefined;
    }

    findLastIndex(fn, arg) {
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=this.#matrix.length-1; i>=0; i--) {
            for(let j=this.#matrix[i].length-1; j>=0; j--) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===true) { return [i, j]; }
            }
        }
        return [-1, -1];
    }

    indexOf(v, from=[0,0]) {
        if (v==undefined) return [-1, -1];
        const [x, y] = this.#reIndex(from);
        if (x>this.row-1) return [-1, -1];
        for(let i=x; i<this.#matrix.length; i++) {
            for(let j=(i==x?y:0); j<this.#matrix[i].length; j++) {
                if (this.#matrix[i][j]===v) { return [i, j]; }
            }
        }
        return [-1, -1];
    }

    lastIndexOf(v, from=[this.row-1,this.#matrix[this.row-1].length-1]) {
        if (v==undefined) return [-1, -1];
        const [x, y] = this.#reIndexBack(from);
        if (x<0) return [-1, -1];
        for(let i=x; i>=0; i--) {
            for(let j=(i==x?y:this.#matrix[i].length-1); j>=0; j--) {
                if (this.#matrix[i][j]===v) { return [i, j]; }
            }
        }
        return [-1, -1];
    }
    
    includes(v, from=[0,0]) {
        if (v==undefined) return false;
        const [x, y] = this.#reIndex(from);
        if (x>this.row-1) return false;
        for(let i=x; i<this.#matrix.length; i++) {
            for(let j=(i==x?y:0); j<this.#matrix[i].length; j++) {
                if (this.#matrix[i][j]===v) { return true; }
            }
        }
        return false;
    }

    at(pos=[0,0]) {
        let [f, s] = this.#reIndexAt(pos);
        if (f>this.row-1 || f<0) return undefined;
        return this.#matrix[f][s];
    }

    join(sep=',') {
        return this.#matrix.map(row => row.join(sep)).join(sep);
    }

    concat() {
        let res = JSON.parse(JSON.stringify(this.#matrix));
        let dir = arguments[arguments.length-1];
        let min = res[0].length;
        let cnt = 0;
        
        switch (dir) {
            case "col":
                if (arguments.length==1) break;

                res.forEach((row, i)=>{ 
                    if (min>row.length) {
                        min = row.length;
                        cnt = i;
                    }
                });

                for (let i=0; i<arguments.length-1; i++) {
                    let arg = arguments[i];
                    if (Matrix.isMatrix(arg)) { arg = arg.value; }
                    if (!Array.isArray(arg) && !arg[Symbol.isConcatSpreadable]==true) {
                        res[cnt] = [...res[cnt], arg];
                        cnt++;
                        cnt = cnt > this.row -1 ? 0 : cnt;
                    } else {
                        for (let j=0; j<arg.length; j++) {
                            if (Array.isArray(arg[j])) {
                                res[cnt] = ( cnt > res.length ? [...arg[j]] : [...res[cnt], ...arg[j]] );
                                cnt++;
                                cnt = cnt > this.row -1 ? 0 : cnt;
                            } else {
                                res[cnt] = (cnt > res.length ? [arg[j]] : [...res[cnt], arg[j]]);
                                cnt++;
                                cnt = cnt > this.row -1 ? 0 : cnt;
                            }
                        }
                    }
                }
                break;

            default:
                res = res.flat(2);
                for (let i=0; i<arguments.length; i++) {
                    let arg = arguments[i];
                    if (Matrix.isMatrix(arg)) { arg = arg.value; }
                    if (!Array.isArray(arg) && !arg[Symbol.isConcatSpreadable]==true) {
                        res = [...res, arg];
                    } else {
                        for (let j=0; j<arg.length; j++) {
                            res = Array.isArray(arg[j]) ? [...res, ...arg[j]] : [...res, arg[j]];
                        }
                    }
                }
                res = this.#organizeMatrix(res);
                break;
        }

        let newMatrix = new Matrix(res.length, res[0].length);
        newMatrix.value = res;
        return newMatrix;
    }

    pop() {
        if (this.#matrix.length==0) return undefined;
        let res='';
        let temp=[];
        this.#matrix.forEach((r,i) => {
            if (i == this.row-1) 
                r.forEach((col,j) => { 
                    if (j == r.length-1) res = r.pop();
                });
            if (r.length>0) temp.push(r);
        });
        this.#matrix = temp;
        this.row = this.#matrix.length;
        if (this.row==0) {
            this.column = 0;
        } else {
            this.column = this.#matrix[0].length;
        }
        return res;
    }

    push() {
        if (arguments.length==0) return undefined;
        for(let i=0; i<arguments.length;i++) {
            this.#matrix[this.row-1].push(arguments[i]);
        }
        this.#matrix = this.#organizeMatrix(this.#matrix);
        this.row = this.#matrix.length;
        this.column = this.#matrix[0].length;
        return this.#matrix[this.#matrix.length-1].length; 
    }

    shift() {
        if (this.#matrix.length==0 || this.#matrix[0].length==0) return undefined;
        let res=this.#matrix[0].shift();
        this.#matrix = this.#organizeMatrix(this.#matrix);
        this.row = this.#matrix.length;
        this.column = this.#matrix[0].length;
        return res;
    }

    unshift(v) {
        if (v==undefined) return undefined;
        this.#matrix[0].unshift(v);
        this.#matrix = this.#organizeMatrix(this.#matrix);
        this.row = this.#matrix.length;
        this.column = this.#matrix[0].length;
        return this.#matrix[this.#matrix.length-1].length;        
    }

    slice(from=[0,0], to=[this.row-1, this.column]) {
        const [si, sj] = this.#reIndex(from);
        const [ei, ej] = this.#reIndexTo(to);
        if (si>this.row || si>ei || (ei==si && sj>=ej)) return [];
        if (ei<0 && ej<0) return [];
        let temp = [];
        for(let i=0; i<this.row; i++) {
            let row=this.#matrix[i];
            if (i<si || i>ei) continue;
            for(let j=0; j<row.length; j++) {
                let col = row[j];
                if (i==si && j<sj) continue;
                if (i==ei && j>=ej) continue;
                temp.push(col);
            }
        }
        let tempArr=this.#organizeMatrix(temp);
        let newMatrix = new Matrix(tempArr.length, tempArr[0].length);
        newMatrix.value = tempArr;
        return newMatrix;
    }

    splice() {
        if (arguments[0]==undefined) return [];
        if (!Array.isArray(arguments[0])) return [];
        if (arguments[0].length!=2) return [];
        let [f,s] = this.#reIndex(arguments[0]);
        let delNo = (arguments[1]==undefined ? this.row*this.column : arguments[1]);
        let delArr= [];
        if (delNo>0 && f<=this.row-1) {
            for (let i=0; i<delNo; i++) {
                if (s>this.#matrix[f].length-1) { f++; s=0; }
                if (f>this.#matrix.length-1 || (f==this.#matrix.length-1 && s>this.#matrix[f].length-1)) break;
                delArr.push(this.#matrix[f][s]);
                this.#matrix[f][s]='!!ToBeRemovedSoon!!';
                s++;
            }
        }
        let temp = this.#matrix.flat().filter(el => el!=='!!ToBeRemovedSoon!!');
        [f,s] = this.#reIndex(arguments[0]);
        let pos = this.row==1 ? s : f * this.column + s;
        if (arguments[2]!==undefined && pos<temp.length-1) {
            for(let i=2; i<arguments.length; i++) {
                let arg = arguments[i];
                temp.splice(pos+i-2, 0, arg);
            }
        }
        this.#matrix = this.#organizeMatrix(temp);
        this.row = this.#matrix.length;
        this.column = this.#matrix[0].length;
        return delArr;
    }

    every(fn=undefined, arg) {
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=0; i<this.#matrix.length; i++) {
            for(let j=0; j<this.#matrix[i].length; j++) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===false) { return false; }
            }
        }
        return true;
    }

    some(fn=undefined, arg) {
        if (arg!==undefined) fn = fn.bind(arg);
        for(let i=0; i<this.#matrix.length; i++) {
            for(let j=0; j<this.#matrix[i].length; j++) {
                if (fn(this.#matrix[i][j], [i, j], this.#matrix)===true) { return true; }
            }
        }
        return false;
    }

    reduce(fn=undefined, init) {
        let sum;
        let prev;
        let start = 0;
        if (this.#matrix.flat(2).length == 0) return;
        if (init==undefined) {
            start = 1;
            prev = this.#matrix[0][0];
        } else {
            prev = init;
        }
        for(let i=0; i<this.#matrix.length; i++) {
            for(let j=(i==0?start:0); j<this.#matrix[i].length; j++) {
                sum = fn(prev, this.#matrix[i][j], [i, j], this.#matrix);
                prev = sum;
            }
        }
        return sum;
    }

    reduceRight(fn=undefined, init) {
        let sum;
        let prev;
        let start = this.#matrix[this.row-1].length-1;
        let rowStart = this.row - 1;
        if (this.#matrix.flat(2).length == 0) return;
        if (init==undefined) {
            start = this.#matrix[rowStart].length-2;
            if (start<0) {
                rowStart--;
                if (rowStart<0) return this.#matrix[this.row-1][this.column-1];
                start = this.#matrix[rowStart].length-1;
            }
            prev = this.#matrix[0][0];
        } else {
            prev = init;
        }
        for(let i=rowStart; i>=0; i--) {
            for(let j=(i==rowStart?start:this.#matrix[i].length-1); j>=0; j--) {
                sum = fn(prev, this.#matrix[i][j], [i, j], this.#matrix);
                prev = sum;
            }
        }
        return sum;
    }

    values() {
        function *generate () {
            for(let i=0; i<this.row; i++) {
                for(let j=0; j<this.#matrix[i].length; j++) {
                    yield this.#matrix[i][j];
                }
            }
        }
        const gen = generate.bind(this);
        return gen();
    }

    entries() {
        function *generate () {
            for(let i=0; i<this.row; i++) {
                for(let j=0; j<this.#matrix[i].length; j++) {
                    yield [[i, j], this.#matrix[i][j]];
                }
            }
        }
        const gen = generate.bind(this);
        return gen();
    }

    keys() {
        function *generate () {
            for(let i=0; i<this.row; i++) {
                for(let j=0; j<this.#matrix[i].length; j++) {
                    yield [i, j];
                }
            }
        }
        const gen = generate.bind(this);
        return gen();
    }

    toString() {
        return this.#matrix.toString();
    }

    copyWithin(target=[0,0], start=[0,0], end=[this.row-1, this.#matrix[this.row-1].length]) {
        target = this.#reIndex(target);
        if (target[0]>this.row-1) return this;
        start = this.#reIndex(start);
        if (start[0]>this.row-1) return this;
        end = this.#reIndexTo(end);
        let fTarget = this.row==1 ? target[1] : target[0] * this.column + target[1];
        let fStart = this.row==1 ? start[1] : start[0] * this.column + start[1];
        let fEnd = this.row==1 ? end[1] : end[0] * this.column + end[1];
        let temp = this.#matrix.flat(3).copyWithin(fTarget, fStart, fEnd);
        let tempArr= [];
        if (temp.length>0) { 
            let r = [];
            temp.forEach((u, i)=>{
                r.push(u);
                if ((i+1)%this.column==0 || i==temp.length-1) {
                    tempArr.push(r);
                    r=[];
                }
            });            
        }
        this.#matrix = tempArr;
        return this;
    }

    #reIndexAt(at) {
        let [f, s] = at;
        f = (f<0) ? this.row+f : f;
        s = (s<0) ? this.column+s : s;
        return [f, s];
    }

    #reIndex(from) {
        let [f, s] = from;
        f = (f<0) ? this.row+f : f;
        f = (f<0 ? 0 : f);
        if (s<0) s = this.#matrix[f].length+s;
        s = (s<0 ? 0 : s);
        if (f==this.row-1 && s>this.#matrix[f].length-1) f=this.row;
        if (f<this.row-1 && s>this.column-1) {
            f++;
            s=0;
        }
        return [f, s];
    }

    #reIndexBack(from) {
        let [f, s] = from;
        f = (f<0) ? this.row+f : f;
        f = (f>this.row-1 ? this.row-1 : f);
        if (s<0) s = this.#matrix[f].length + s;
        s = (s>this.#matrix[f].length-1 ? this.#matrix[f].length-1 : s);
        if (f==0 && s<0) f=-1;
        if (f>0 && s<0) {
            f--;
            s=this.#matrix[f].length-1;
        }
        return [f, s];        
    }

    #reIndexTo(to) {
        let [f, s] = to;
        if (f<0) f = this.row+f;
        f = (f>this.row-1 ? this.row-1 : f);
        if (s<0) s = this.#matrix[f].length+s;
        s = (s>this.#matrix[f].length ? this.#matrix[f].length : s);
        if (f==0 && s<1) f=-1;
        if (f>0 && s<=0) {
            f--;
            s=this.#matrix[f].length;
        }
        return [f, s];               
    }

    #organizeMatrix(arr) {
        arr = arr.flat();
        let tempArr= [];
        let r = [];
        arr.forEach((u, i)=>{
            r.push(u);
            if ((i+1)%this.column==0 || i==arr.length-1) {
                tempArr.push(r);
                r=[];
            }
        });
        return tempArr;
    }    
}