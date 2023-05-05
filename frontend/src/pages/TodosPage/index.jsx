import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Navbar from "components/common/Navbar";
import AddTodo from "components/TodosPage/AddTodo";
import TodoItem from "components/TodosPage/TodoItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodosThunks } from "store/todos-reducer";
import "./styles.scss"


/**
 * Todos Page component
 */
export default function TodosPage() {

    const dispatch = useDispatch()
    const todos = useSelector(rootState => rootState.todos.todos)

    useEffect(() => {
        dispatch(TodosThunks.getMyTodos())

        // eslint-disable-next-line
    }, [])

    return (
        <div className="page" id="todos-page">
            <Navbar />

            <Grid container justifyContent="center">
                <Grid item xs={10} md={8} lg={6}>

                    <AddTodo />

                    <Grid component={Paper} className="todos" container direction="column">
                        <h1 className="title">My Todos</h1>

                        {todos.map((todo) => {
                            return <TodoItem key={todo.todoId} todo={todo} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
