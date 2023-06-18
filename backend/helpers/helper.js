

const isNonValidFilterNumber=(value)=>{

if(!value || isNaN(value)){
    return true
}

return false
}



module.exports = {isNonValidFilterNumber}