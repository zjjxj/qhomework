import React from 'react';
import Item from './item';


export default class List extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let total = this.props.items.length;
        let finished = 0;
        return <div className="list-group">
            {this.props.items.map((item, index) => {
                if (item.finished) {
                    finished++;
                }
                return <Item key={index} {...item} onItemClick={this.props.onItemClick}
                             onDeleteClick={this.props.onDeleteClick}/>
            })}
            <div className="list-group-item">
                <span>{finished}</span>已完成/<span>{total}</span>总数
            </div>
        </div>
    }


}