const routerApp = require("express").Router();


routerApp.get('/',(req,res)=>{
    res.send("Node Application")
})

module.exports = {routerApp}