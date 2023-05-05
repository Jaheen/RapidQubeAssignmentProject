import * as BodyParser from "body-parser";
import { BookingController, TodosController } from "controllers";
import { Router } from "express";
import { AuthMiddleware } from "middlewares";

const ApiRouter: Router = Router()

ApiRouter.use(BodyParser.json())

// use auth middleware on all api requests
ApiRouter.use(AuthMiddleware)

ApiRouter.get("/", (req, res) => res.json("Hello"))


// Todos routes
ApiRouter.get("/todos/getMyTodos", TodosController.getMyTodos)
ApiRouter.post("/todos/addTodo", TodosController.addTodo)
ApiRouter.delete("/todos/deleteTodo/:todoId", TodosController.deleteTodo)
ApiRouter.put("/todos/setTodoCompleted", TodosController.setTodoCompleted)

// Bookings
ApiRouter.get("/booking/getIndianStates", BookingController.getIndianStates)
ApiRouter.get("/booking/getDistricts/:stateName", BookingController.getDistrictsOfState)
ApiRouter.get("/booking/cars/getCars/:stateName/:districtName", BookingController.getCars)
ApiRouter.get("/booking/cars/:stateName/:districtName/:carId", BookingController.getCarDetails)
ApiRouter.post("/booking/bookCar", BookingController.bookCar)

export default ApiRouter
