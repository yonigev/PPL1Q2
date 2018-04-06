import {map} from 'ramda';
const assert = require('assert');
//-------------------Q2.1-------------------
interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

let t1:BinTree={root:30, 
    right:{ root:322,
            left:{root:54,left:{root:33,right:{root:41}}, right:{root:65,right:{root:66}}}},
    left:{root:12,right:{root:22},left:{root:1,right:{root:2,right:{root:4,left:{root:2}}}}}};
let t2:BinTree={root:1, 
                right:{ root:3},
                left:{root:2,right:{root:5},left:{root:4}}};
        
let t3:BinTree={root:1, 
                right:{ root:13,right:{root:34},left:{root:21}},
                left:{root:1,right:{root:8},left:{root:2,right:{root:5},left:{root:3}}}};
let gen_t1:GBinTree<string>={root:'abc', 
                right:{ root:'def'},
                left:{root:'ghi',right:{root:'jkl'},left:{root:'mnop'}}};


let gen_t2:GBinTree<boolean>={root:true, 
                right:{ root:false},
                left:{root:false,right:{root:false},left:{root:true}}};

let gen_t3:GBinTree<string>={root:'a', 
                right:{ root:'c'},
                left:{root:'b',right:{root:'e'},left:{root:'d'}}};



const TreePreArray:(t:BinTree)=>number[]=(t)=>
    t===undefined?
        []:
        [].concat(t.root).concat(TreePreArray(t.left)).concat(TreePreArray(t.right));



const TreeInArray:(t:BinTree)=>number[]=(t)=>
    t===undefined?
        []:
        [].concat(TreeInArray(t.left)).concat(t.root).concat(TreeInArray(t.right));


const TreePostArray:(t:BinTree)=>number[]=(t)=>
    t===undefined?
        []:
        [].concat(TreePostArray(t.left)).concat(TreePostArray(t.right)).concat(t.root);


const GBinTreePreArray:<T>(t:GBinTree<T>)=>T[]=(t)=>
    t===undefined?
    []:
    [].concat(t.root).concat(GBinTreePreArray(t.left)).concat(GBinTreePreArray(t.right));

const GBinTreeInArray:<T>(t:GBinTree<T>)=>T[]=(t)=>
    t===undefined?
    []:
    [].concat(GBinTreeInArray(t.left)).concat(t.root).concat(GBinTreeInArray(t.right));



const GBinTreePostArray:<T>(t:GBinTree<T>)=>T[]=(t)=>
    t===undefined?
    []:
    [].concat(GBinTreePostArray(t.left)).concat(GBinTreePostArray(t.right).concat(t.root));


function testPreOrder(){
    
    
    const t1Pre=TreePreArray(t1);
    const t2Pre=TreePreArray(t2);
    const t3Pre=TreePreArray(t3);

    assert.deepEqual([30,12,1,2,4,2,22,322,54,33,41,65,66],t1Pre);
    assert.deepEqual([1,2,4,5,3],t2Pre);
    assert.deepEqual([1,1,2,3,5,8,13,21,34],t3Pre)
}
function testInOrder(){
    
    
    const t1In=TreeInArray(t1);
    const t2In=TreeInArray(t2);
    const t3In=TreeInArray(t3);

    assert.deepEqual([1,2,2,4,12,22,30,33,41,54,65,66,322],t1In);
    assert.deepEqual([4,2,5,1,3],t2In);
    assert.deepEqual([3,2,5,1,8,1,21,13,34],t3In)
}
function testPostOrder(){
    const t1Post=TreePostArray(t1);
    const t2Post=TreePostArray(t2);
    const t3Post=TreePostArray(t3);
    assert.deepEqual([2,4,2,1,22,12,41,33,66,65,54,322,30],t1Post);
    assert.deepEqual([4,5,2,3,1],t2Post);
    assert.deepEqual([3,5,2,8,1,21,34,13,1],t3Post)
}   
function testGPreOrder(){
    
    
    const gen_t1Pre=GBinTreePreArray(gen_t1);
    const gen_t2Pre=GBinTreePreArray(gen_t2);
    const gen_t3Pre=GBinTreePreArray(gen_t3);

    assert.deepEqual(['abc','ghi','mnop','jkl','def'],gen_t1Pre);
    assert.deepEqual([true,false,true,false,false],gen_t2Pre);
    assert.deepEqual(['a','b','d','e','c'],gen_t3Pre)
}

function testGInOrder(){
    const gen_t1In=GBinTreeInArray(gen_t1);
    const gen_t2In=GBinTreeInArray(gen_t2);
    const gen_t3In=GBinTreeInArray(gen_t3);
    assert.deepEqual(['mnop','ghi','jkl','abc','def'],gen_t1In);
    assert.deepEqual([true,false,false,true,false],gen_t2In);
    assert.deepEqual(['d','b','e','a','c'],gen_t3In)
}
function testGPostOrder(){
    
    const gen_t1Post=GBinTreePostArray(gen_t1);
    const gen_t2Post=GBinTreePostArray(gen_t2);
    const gen_t3Post=GBinTreePostArray(gen_t3);

    assert.deepEqual(['mnop','jkl','ghi','def','abc'],gen_t1Post);
    assert.deepEqual([true,false,false,false,true],gen_t2Post);
    assert.deepEqual(['d','e','b','c','a'],gen_t3Post)
}

//-------------------Q2.2-------------------

function mapper(val,index,arr){
    
}

const AllSubSets:(A:any[])=>any[]=function(A){
    let numOfSubSets=Math.pow(2,A.length);
    let i;      //I (in its binary form) would act as a mask for the array. (if the i'th bit is 1, take the i'th element into the subset)
    let toReturn=[]
    for(i=0; i<numOfSubSets; i++){
        let subset=[];
        let j;
        for(j=0; j<A.length; j++){
            let currIndex=Math.pow(2,j);

            if(Math.floor(i/(currIndex)) % 2 === 1)
                subset=subset.concat(A[j]);
        }
        toReturn.push(subset);
    }
    return toReturn;
}
const KSubsets:(A:any[],k:number)=>any[]=function(A,k){
   return AllSubSets(A).filter(x=>x.length===k);
}








//test numeric trees
testPreOrder();
testInOrder();
testPostOrder();
//test generic trees
testGPreOrder();
testGInOrder();
testGPostOrder();
console.log(KSubsets([1,2,3,4],2));

