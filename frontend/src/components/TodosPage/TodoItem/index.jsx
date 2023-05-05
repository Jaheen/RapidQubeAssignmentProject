import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { TodosThunks } from "store/todos-reducer"
import "./styles.scss"


/**
 * Component that represent a single todo
 */
function TodoItem(props) {

    const { todo } = props
    const { todoId, title, isCompleted } = todo
    const dispatch = useDispatch()

    const onDoneButtonClicked = () => {
        console.log(todoId, "Done button")

        if (isCompleted)
            dispatch(TodosThunks.setTodoCompleted({ todoId, isCompleted: false }))
        else
            dispatch(TodosThunks.setTodoCompleted({ todoId, isCompleted: true }))
    }

    const onDeleteButtonClicked = () => {
        dispatch(TodosThunks.deleteTodo({ todoId }))
        console.log(todoId, "Delete button")
    }

    return (
        <Grid className={`todo-item ${isCompleted ? "completed" : "incomplete"}`} container wrap="nowrap" alignItems="center">
            <h3 className="todo-item__title">{title}</h3>
            <IconButton className="done-button" onClick={onDoneButtonClicked}>
                <DoneIcon />
            </IconButton>
            <IconButton className="delete-button" onClick={onDeleteButtonClicked}>
                <DeleteIcon />
            </IconButton>
        </Grid>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default TodoItem
