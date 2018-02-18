import TodoList from "../components/todoList";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        onSaveTask: (task) => {
            dispatch({type: "ADD_TASK", task});
        },
        onItemClick: (num) => {
            dispatch({"type": "CLICK_TASK", num})
        },
        onDeleteClick: (num) => {
            dispatch({"type": "DELETE_TASK", num})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);