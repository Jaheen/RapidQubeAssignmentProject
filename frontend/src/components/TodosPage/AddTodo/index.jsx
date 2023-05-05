import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { TodosThunks } from "store/todos-reducer"
import "./styles.scss"


/**
 * Component to add new todo
 */
function AddTodo() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    const onAddTodoButtonClicked = () => {
        dispatch(TodosThunks.addTodo({ title }))
        setTitle("")
    }

    return (
        <Paper component="section" id="add-todo">
            <h1 className="title">Add Todo</h1>
            <Grid className="add-todo__form" container justifyContent="center">
                <Grid item xs={12}>
                    <input type="text" placeholder="Enter title for Todo" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                    <Button variant="contained" disabled={title.trim() === ""} disableElevation fullWidth onClick={onAddTodoButtonClicked}>Add Todo</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default memo(AddTodo)
