



function responseSuccess(req,res,data){
    
    if(!data){
        res.status(201).json({success:true})
        return;
    }
    res.status(200).json({success:true , data});
};


function responseFailed(req,res,error,message){

    res.status(400).json({success:false , message , error});

}


module.exports={responseFailed,responseSuccess}