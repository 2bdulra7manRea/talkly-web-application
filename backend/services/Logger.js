
module.exports =  class LoggerApplication{


static log(data){
    this.print(data,'info')
};


static warn(data){
    this.print(data,'warn')
};


static error(data){
    this.print(data,'error')
};

static print(data,type){
    console.log(`[${type.toUpperCase()}]`,data)
}

}