import { Todos } from "database/models"


/**
 * Service to handle logic related to todos
 */
export default class TodosService {

    /**
     * Get the todos of the logged user
     * @param userId userId of the logged user
     * @returns array of todos
     */
    static async getTodos(userId: string): Promise<Array<object>> {
        return new Promise((resolve, reject) => {
            Todos.find({ userId }).then(todos => {
                const data = []

                todos.forEach(todo => {
                    const todoData = todo.toJSON()
                    todoData["todoId"] = todoData._id
                    delete todoData._id
                    data.push(todoData)
                })

                resolve(data)
            }).catch(console.log)
        })
    }

    /**
     * Create a new todo for the logged user
     * @param userId is of the logged user
     * @param title title of the new todo
     * @returns a promise containing the created todo
     */
    static async addTodo(userId: string, title: string): Promise<object> {
        return new Promise((resolve, reject) => {
            Todos.create({ userId, title }).then(todo => {
                const todoData = todo.toJSON()
                todoData["todoId"] = todoData._id
                delete todoData._id
                resolve(todoData)
            }).catch(console.log)
        })
    }

    /**
     * Delete a todo of the user
     * @param userId userid of the logged user
     * @param todoId id of the todo tobe deleted
     * @returns a promise containing a boolean flag indicating whether deleted or not
     */
    static async deleteTodo(userId: string, todoId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Todos.deleteOne({ _id: todoId, userId })
                .then(result => resolve(result.acknowledged && result.deletedCount === 1))
                .catch(console.log)
        })
    }

    /**
     * 
     * @param userId id of the logged user
     * @param todoId of of the todo to be updated
     * @param value new value for completed flag
     * @returns a boolean promise containing updated or not
     */
    static async setTodoCompleted(userId: string, todoId: string, value: boolean): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Todos.updateOne({ _id: todoId, userId }, { isCompleted: value })
                .then(result => resolve(result.acknowledged && result.modifiedCount === 1))
                .catch(console.log)
        })
    }
}