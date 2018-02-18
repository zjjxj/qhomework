import React from 'react';
import List from './list';
import Footer from './footer';


export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <div>
            <h1 className="header text-center">
                React Todo
            </h1>
            <List onItemClick={this.props.onItemClick} items={this.props.items}
                  onDeleteClick={this.props.onDeleteClick}/>
            <Footer onSaveTask={this.props.onSaveTask}/>
        </div>
    }


}