import { Router } from "express";
//const ApiController = require("./controllers/ApiController");
import { StudentController } from "./controllers/StudentController";

const studentController = new StudentController();

const routes = Router();

routes.get("/", (request, response) => {
  response.json({
    Info: "Api bot v1",
  });
});

//routes.post("/apiwebhook", ApiController.fulfillmentText);

routes.get("/students", studentController.list);
routes.post("/student", studentController.create);

export { routes };
