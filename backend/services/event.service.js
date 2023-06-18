


const { isNonValidFilterNumber } = require("../helpers/helper")
const eventModel = require("../models/event.model")



module.exports = class EventsService{


async createNewEvent(body){
    try {
      const d =  await eventModel.create(body);  
    } catch (error) {
     console.log(error)   
    }
    return "Message";
};


async getEvents(filter){
    
const {limit , offset  } = filter

const where = {limit,offset};

if(isNonValidFilterNumber(limit)){
where.limit=10;
}
if(isNonValidFilterNumber(offset)){
where.offset=0;
}

return eventModel.find({}).limit(where.limit).skip(where.offset)

};


}