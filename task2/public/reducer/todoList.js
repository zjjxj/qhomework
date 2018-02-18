export default (state = {items: []}, action) => {
    if (action.type === 'ADD_TASK') {
        let task = {"content": action.task, "finished": false, "number": state.items.length};
        return Object.assign({}, state, {items: state.items.concat(task)});
    } else if (action.type === "CLICK_TASK") {
        let arr = Object.assign([], state.items);
        if (arr[action.num].finished) {
            arr[action.num].finished = false;
        } else {
            arr[action.num].finished = true;
        }
        return Object.assign({}, state, {items: arr});

    } else if (action.type === "DELETE_TASK") {

        let arr = Object.assign([], state.items);
        arr.splice(action.num, 1);
        arr.forEach((value, index) => {
            value.number = index;
        });

        state.items = arr;
        console.log(state.items);
        return Object.assign({}, state, {items: arr});
    }
    return state;
}