

const { responseSuccess, responseFailed } = require('./respones/customeResponse');




async function handleRequest(req, res, callback) {
  try {
    const results = await callback({ req, res });
   return responseSuccess(req, res, results);
  } catch (error) {
   return responseFailed(req, res, error.message);
  }
}



module.exports = class Routing{
router;
constructor(router){
    this.router = router
}

post(routes,callback){
   return this.router.post(routes,(req,res)=>handleRequest(req,res,callback))
};

get(routes,callback){
    return this.router.get(routes,(req,res)=>handleRequest(req,res,callback))
};

patch(routes,callback){
   return this.router.patch(routes,(req,res)=>handleRequest(req,res,callback))
};

}