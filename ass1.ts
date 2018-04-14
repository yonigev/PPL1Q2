import {map} from 'ramda';
import {reduce} from 'ramda';

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


function testPreOrder1():boolean{
    assert.deepEqual([30,12,1,2,4,2,22,322,54,33,41,65,66],TreePreArray(t1));
    return true;
}
function testPreOrder2():boolean{
    assert.deepEqual([1,2,4,5,3],TreePreArray(t2));
    return true;
}

function testPreOrder3():boolean{
    assert.deepEqual([1,1,2,3,5,8,13,21,34],TreePreArray(t3));
    return true;

}
function testPreOrder():boolean{
    return testPreOrder1() && testPreOrder2() && testPreOrder3();
}
function testInOrder1():boolean{ assert.deepEqual([1,2,2,4,12,22,30,33,41,54,65,66,322],TreeInArray(t1)); return true;}
function testInOrder2():boolean{    assert.deepEqual([4,2,5,1,3],TreeInArray(t2)); return true;}

function testInOrder3():boolean{    assert.deepEqual([3,2,5,1,8,1,21,13,34],TreeInArray(t3)); return true;}
function testInOrder(){
   return testInOrder1 && testInOrder2 && testInOrder3;
}


function testPostOrder1():boolean{
    assert.deepEqual([2,4,2,1,22,12,41,33,66,65,54,322,30],TreePostArray(t1)); return true;}
function testPostOrder2():boolean{
    assert.deepEqual([4,5,2,3,1],TreePostArray(t2)); return true;}
function testPostOrder3():boolean{    assert.deepEqual([3,5,2,8,1,21,34,13,1],TreePostArray(t3)); return true;}
function testPostOrder():boolean{
   return testPostOrder1() && testPostOrder2() && testPostOrder3();
}   

function testGPreOrder1():boolean{    assert.deepEqual(['abc','ghi','mnop','jkl','def'],GBinTreePreArray(gen_t1)); return true;}
function testGPreOrder2():boolean{    assert.deepEqual([true,false,true,false,false],GBinTreePreArray(gen_t2)); return true;}
function testGPreOrder3():boolean{    assert.deepEqual(['a','b','d','e','c'],GBinTreePreArray(gen_t3)); return true;}


function testGPreOrder():boolean{
    return testGPreOrder1() && testGPreOrder2() && testGPreOrder3();
}

function testGInOrder1():boolean{    assert.deepEqual(['mnop','ghi','jkl','abc','def'],GBinTreeInArray(gen_t1)); return true;}
function testGInOrder2():boolean{    assert.deepEqual([true,false,false,true,false],GBinTreeInArray(gen_t2)); return true;}
function testGInOrder3():boolean{    assert.deepEqual(['d','b','e','a','c'],GBinTreeInArray(gen_t3)); return true;}
function testGInOrder():boolean{
    return testGInOrder1() && testGInOrder2() && testGInOrder3();
}

function testGPostOrder1():boolean{    assert.deepEqual(['mnop','jkl','ghi','def','abc'],GBinTreePostArray(gen_t1)); return true;}
function testGPostOrder2():boolean{    assert.deepEqual([true,false,false,false,true],GBinTreePostArray(gen_t2)); return true;}
function testGPostOrder3():boolean{    assert.deepEqual(['d','e','b','c','a'],GBinTreePostArray(gen_t3)); return true;}
function testGPostOrder():boolean{
    
   return testGPostOrder1()&&testGPostOrder2()&&testGPostOrder3();
}

//-------------------Q2.2-------------------f
const AllSubsets:<T>(A:T[])=>T[][]=(A)=>
    AllSubsetsR(A,A.length);

const AllSubsetsR:<T>(A:T[],k:number)=>T[][]=function(A,k){
    if(k<0)
        return[];
    return [...KSubsets(A,A.length-k),...AllSubsetsR(A,k-1)];
}

function array_contains<T>(A:T[]|T[][], element:T){
    let i;
    for(i=0; i<A.length; i++){
        if(A[i]===element)
            return true;
        if(A[i] instanceof Array && element instanceof Array && equalSets(<T[]>A[i],element))
            return true;

        
    }
    
    return false;
}
//returns true if all elements in array A exist in array B and B's elements in A. (assuming no recurring values)
function equalSets<T>(A:T[],B:T[]){
    let i;
    let j;
    if(A.length === B.length){
        for(i=0; i<A.length; i++){
            if(!(array_contains(B,A[i]) && array_contains(A,B[i])))
                return false;
        }
        return true;
    }
    return false;
}
//Recursive version.
const KSubsets:<T>(A:T[],k:number)=>T[][]=(A,k)=>
    KSubsetR(A,[],k);
const KSubsetR:<T>(A:T[],ret:T[],k:number)=>T[][]=(A,ret,k)=>{
    if(k===0)
        return[ret];
    else if(k>A.length || A.length===0)
        return [];
    //    take the first element and continue recursion                    ,   don't take the first element, and continue recursion
    return [...KSubsetR(A.filter((x)=>A.indexOf(x)!=0),[...ret,A[0]],k-1),...KSubsetR(A.filter((x)=>A.indexOf(x)!=0),[...ret],k)];
    
}
//older version of KSubsets
// const KSubsets:(A:any[],k:number)=>any[]=(A,k)=>
//     AllSubsets(A).filter(x=>x.length===k);

function testKSubsets1():boolean{
    assert.ok(equalSets([ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ], KSubsets([1,2,3,4],3)));
    return true;}
function testKSubsets2():boolean{    assert.ok(equalSets([ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ], KSubsets([1,2,3,4],1))); return true;}
function testKSubsets3():boolean{    assert.ok(equalSets([ [ 1, 2 ], [ 1, 3 ], [ 1, 4], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ], KSubsets([1,2,3,4],2))); return true;}
function testKSubsets():boolean{
    return testKSubsets1() && testKSubsets2() && testKSubsets3();
}
function testAllSubsets1():boolean{ 
    let allFour=[ [],[ 1 ],[ 2 ],[ 1, 2 ], [ 3 ],    [ 1, 3 ],[ 2, 3 ], [ 1, 2, 3 ],[ 4 ],[ 1, 4 ],[ 2, 4 ],[ 1, 2, 4 ],[ 3, 4 ],[ 1, 3, 4 ],[ 2, 3, 4 ],[ 1, 2, 3, 4 ] ];
    assert.ok(equalSets(allFour, AllSubsets([1,2,3,4]))); 
    return true;}

function testAllSubsets2():boolean{   
    let allThree=[ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ];
    assert.ok(equalSets(allThree, AllSubsets([1,2,3])));
    return true;
}
function testAllSubsets3():boolean{
    let allTwo=[ [], [ 1 ], [ 2 ], [ 1, 2 ] ];
    assert.ok(equalSets(allTwo, AllSubsets([1,2])));
    return true;
}
function testAllSubsets():boolean{
   return testAllSubsets1() && testAllSubsets2() && testAllSubsets3();
}


//-------------------Q2.3.1-------------------
const flatmap:<T,U>(func:<T>(value:T)=>U[],array:T[])=>U[]=function(func,arr){
     
    return reduce((acc,curr)=>acc.concat(curr),[],map(func,arr));
    
}


function testFlatMap1():boolean{ 
    const func1=(x)=>x[0];
    assert.deepEqual(flatmap(func1,[[[1,2], [3,4]], [[5,6], [7,8]]]), [1,2,5,6]);
    return true;
}
function testFlatMap2():boolean{
    const func2=(x)=>[x[0]];
    assert.deepEqual(flatmap(func2,[[[1,2], [3,4]], [[5,6], [7,8]]]), [[1,2],[5,6]]);
    return true;
}
function testFlatMap3():boolean{
    const func3=(x)=> x.concat(x);
    assert.deepEqual(flatmap(func3,[[[1,2], [3,4]], [[5,6], [7,8]]]), [ [ 1, 2 ],[ 3, 4 ],[ 1, 2 ],[ 3, 4 ], [ 5, 6 ], [ 7, 8 ],[ 5, 6 ],[ 7, 8 ] ]);
    return true;
}
function testFlatMap():boolean{
    return testFlatMap1() && testFlatMap2() && testFlatMap3();
}
//-------------------Q2.3.2-------------------
//interfaces - according to the example.
interface bookmark{id:number;time:number};
interface boxart{width:number;height:number;url:string};
interface video{id:number;
            title:string;
            boxarts:boxart[];
            url:string;
            rating:number;
            bookmark:bookmark[]}

interface movielist{name:string;
                    videos:video[]};

interface custom_boxart{id:number;
                        title:string;
                        boxart:string};



//Movie lists for testing
const example_movielists1=[
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }];

const example_movielists2=[
        {
            name: "Instant Queue",
            videos : [
                {
                    "id": 1,
                    "title": "Movie1",
                    "boxarts": [
                        { width: 150, height: 200, url: "CorrectBoxArt" },
                        { width: 200, height: 200, url: "IncorrectBoxArt" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 2,
                    "title": "Movie2",
                    "boxarts": [
                        { width: 200, height: 200, url: "IncorrectBoxArt" },
                        { width: 150, height: 200, url: "CorrectBoxArt" }
    
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 3,
                    "title": "Movie3",
                    "boxarts": [
                        { width: 150, height: 200, url: "CorrectBoxArt" },
                        { width: 200, height: 200, url: "IncorrectBoxArt" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 4,
                    "title": "Movie4",
                    "boxarts": [
                        { width: 200, height: 200, url: "IncorrectBoxArt" },
                        { width: 150, height: 200, url: "CorrectBoxArt" },
                        { width: 300, height: 200, url: "IncorrectBoxArt" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }];
                        


//Q 2.3.2
const getBoxarts:(list:movielist[])=>custom_boxart[]=(list:movielist[])=>
        flatmap(<movielist>(x)=>x.videos,list)                                     //get only the videos from all movie listS
        .map((x:video)=>({id:x.id,title:x.title,                            //for every video, place a new type (custom_boxart)
            boxart:reduce((acc:boxart,curr:boxart)=>curr.url,'',            //reduce the array of boxarts (strings) into one. (we assume one. boxart with dimensions 150 X 200 )
                x.boxarts.filter(x=>(x.width===150 && x.height===200)))})); //filter all boxarts, leave only those with 150 X 200 dimensions.
            
const getBoxArts=getBoxarts;    //in case there's a typo in the instructions. (getBoxArts & getBoxarts)

//test getBoxarts()
function testGetBoxarts1():boolean{
    let output1:custom_boxart[]=getBoxarts(example_movielists1);
    const expectedOutput1:custom_boxart[]=[{ id: 70111470,
        title: 'Die Hard',
        boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
      { id: 654356453,
        title: 'Bad Boys',
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
      { id: 65432445,
        title: 'The Chamber',
        boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
      { id: 675465,
        title: 'Fracture',
        boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } ];
    assert.deepEqual(output1,expectedOutput1);
    return true;
}
function testGetBoxarts2():boolean{
    let output2:custom_boxart[]=getBoxarts(example_movielists2);
    const expectedOutput2:custom_boxart[]=[
        {   id:1,
            title:'Movie1',
            boxart:'CorrectBoxArt'},
        {   id:2,
            title:'Movie2',
            boxart:'CorrectBoxArt'},
        {   id:3,
            title:'Movie3',
            boxart:'CorrectBoxArt'},
        {   id:4,
            title:'Movie4',
            boxart:'CorrectBoxArt'}];
            assert.deepEqual(output2,expectedOutput2);
            return true;

}
function testGetBoxarts3():boolean{
    let output2:custom_boxart[]=getBoxarts(example_movielists2);
    assert.ok(output2[0].boxart==='CorrectBoxArt' && output2[1].boxart==='CorrectBoxArt' && output2[2].boxart==='CorrectBoxArt' && output2[3].boxart==='CorrectBoxArt');
    return true;
}
function testGetBoxarts():boolean{
    return testGetBoxarts1() &&testGetBoxarts2() && testGetBoxarts3();
    }
//test numeric trees
testPreOrder();
testInOrder();
testPostOrder();
//test generic trees
testGPreOrder();
testGInOrder();
testGPostOrder();
//test KSubsets
testKSubsets();
testAllSubsets();
//test flatmap and getBoxarts
testFlatMap();
testGetBoxarts();
