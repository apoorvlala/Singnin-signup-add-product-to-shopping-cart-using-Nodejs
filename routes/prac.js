var router=require('express').Router();
router.get('/',(req ,res,next)=>{
    let a=[1,2,3,4];
    let b=a;
    b=[...a];
    b.push(90);
    console.log('b:'+b);
    console.log('a:'+a);
});

router.get('/dup',(req,res)=>{
    let c=[8,9,3,5,9,4];
    var bSet=new Set(c);
    console.log([...bSet]);

    let d=[8,9,3,5,9,4];
    var b=[];
    for(let i=0;i<d.length;i++){
        if(b.indexOf(d[i])===-1){
            b.push(d[i]);
        }
    }
    console.log(b);

});
module.exports=router;