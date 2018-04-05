import {map} from 'ramda';
const assert = require('assert');

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
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
    
    
testPreOrder();
testInOrder();
testPostOrder();
