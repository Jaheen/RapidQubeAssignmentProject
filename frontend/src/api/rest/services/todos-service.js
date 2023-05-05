import { AxiosInstance } from "../axios"

/**
 * Service to make requests related to todos
 */
export default class TodosService {

    /**
     * Get all todos of the user
     * @returns the fetched todos
     */
    static async getMyTodos() {
        return new Promise((resolve, reject) => {
            AxiosInstance.get("/api/todos/getMyTodos").then(response => {
                const { status, data } = response
                if (status === 200)
                    resolve(data.todos)
            })
        })
    }

    /**
     * Add a new todo on the server.
     * @param {string} title title of the todo
     */
    static async addTodo(title) {
        return new Promise((resolve, reject) => {
            AxiosInstance.post("/api/todos/addTodo", { title }).then(response => {
                const { status, data } = response
                if (status === 200) {
                    const { newTodo, message } = data
                    if (message === "success") resolve(newTodo)
                    else reject()
                }
            })
        })
    }

    /**
     * Delete a particular todo of a user
     * @param {string} todoId id of the todo to be deleted
     */
    static async deleteTodo(todoId) {
        return new Promise((resolve, reject) => {
            AxiosInstance.delete(`/api/todos/deleteTodo/${todoId}`).then(response => {
                const { data, status } = response

                if (status === 200)
                    resolve(data.isDeleted)
            })
        })
    }

    /**
     * Set the value of isCompleted of a todo on server
     * @param {string} todoId id of todo
     * @param {boolean} isCompleted value to be updated
     * @returns a promise containing updated value
     */
    static async setTodoCompleted(todoId, isCompleted) {
        return new Promise((resolve, reject) => {
            AxiosInstance.put("/api/todos/setTodoCompleted", { todoId, isCompleted }).then(response => {
                const { status, data } = response
                if (status === 200)
                    resolve(data.isUpdated)
            })
        })
    }
}