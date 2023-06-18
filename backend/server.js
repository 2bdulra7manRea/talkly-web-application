const express = require('express');
const { Server } = require('socket.io');
const LoggerApplication = require('./services/Logger');

const application = express();

const http = require('http');
const { connectToDatabase } = require('./configs/db.config');
const httpServer = http.createServer(application);

async function bootstrap(applicationInstance,port){

    applicationInstance.listen(port,()=>{

        LoggerApplication.log(`Node Application is running on port ${port}`)

    })


   await connectToDatabase()

}


function registerRoute(route){
    application.use(route)
}

function middleware(callback){
    application.use(callback);
};


const socketServer= {}
// new Server(httpServer,{transports:["websocket"]})



module.exports = {bootstrap,application,LoggerApplication,registerRoute , middleware , socketServer}