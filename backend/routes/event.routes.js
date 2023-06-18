const Routing = require("../services/Routing.service");
const EventsService = require("../services/event.service");
const EventController = require("../controller/event.controller");

const eventRouter = (app) => {
  const eventService = new EventsService();
  const eventController = new EventController(eventService);

  const route = new Routing(app);
  route.post("/events/new", eventController.create.bind(eventController));
  route.get("/events", eventController.get.bind(eventController));
};

module.exports = { eventRouter };
