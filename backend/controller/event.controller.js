


module.exports= class EventController{
    service;
    
    constructor(eventService){
            this.service = eventService; 
    }
    
    async create(ctx){
    console.log('....create')
    const {req} = ctx
    
    return await this.service.createNewEvent(req.body)

    }


    async get(ctx){
        const {req} = ctx
        return this.service.getEvents(req.query)

    }
    
    
    }