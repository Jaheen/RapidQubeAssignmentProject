import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { TodosService } from "services";

/**
 * Controller class to handler related to todos
 */
export default class TodosController {

    static async getMyTodos(req: Request, res: Response) {
        const userId = req["userId"]

        TodosService.getTodos(userId)
            .then(todos => res.json({ todos }))
    }

    static async addTodo(req: Request, res: Response) {
        const userId = req["userId"]
        const { title } = req.body

        if (typeof title === "string" && title.trim() !== "")
            TodosService.addTodo(userId, title)
                .then(newTodo => res.json({ message: "success", newTodo }))
        else
            res.status(400).json({ error: "title-not-found" })
    }

    static async deleteTodo(req: Request, res: Response) {
        const userId = req["userId"]
        const { todoId } = req.params

        if (todoId && isValidObjectId(todoId)) {
            TodosService.deleteTodo(userId, todoId).then(isDeleted => res.json({ isDeleted }))
        }
    }

    static async setTodoCompleted(req: Request, res: Response) {
        const userId = req["userId"]

        const { todoId, isCompleted } = req.body

        if (todoId && isValidObjectId(todoId))
            TodosService.setTodoCompleted(userId, todoId, isCompleted)
                .then(isUpdated => res.json({ isUpdated }))
    }
}