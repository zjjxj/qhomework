import React from 'react';
import ReactDOM from 'react-dom';


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{content: "吃饭", finished: false}]
        };
        this.handleClick = this.handleClick.bind(this); //Q1:不加会报错
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }


    handleClick() {
        if (this.refs.textInput.value) {
            let items = this.state.items.concat({content: this.refs.textInput.value, finished: false});
            this.setState({items: items});
            this.refs.textInput.value = "";
        }
    }

    onCheckBoxClick(e) {
        //Q3:取不到自定义标签属性
        let items = this.state.items;

        if (e.target.type == "checkbox") {
            if (e.target.checked) {
                items[e.target.className].finished = true;
            } else {
                items[e.target.className].finished = false;
            }

            this.setState({items: items});
        }
    }

    handleKeyUp(e) {
        if (e.keyCode == 13) {
            this.handleClick();
        }
    }

    onDeleteClick(e) {
        let items = this.state.items;
        let number = parseInt(e.target.className);

        items.splice(number, 1);
        this.setState({items: items})
    }


    render() {
        return <div>

            <h1 className="header text-center">
                React Todo
            </h1>
            <List className="list-group" items={this.state.items} onCheckBoxClick={this.onCheckBoxClick}
                  onDeleteClick={this.onDeleteClick}/>
            <div className='footer form-horizontal'>
                <div className="form-group">
                    <label className="col-md-2 control-label">Task</label>
                    <div className="col-md-10">
                        <input className='form-control' type="text" placeholder="你想做点什么" ref="textInput"
                               onKeyUp={this.handleKeyUp}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-10 col-md-2">
                        <button onClick={this.handleClick} className="btn btn-primary">Save Task</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        let mouseState = [];
        this.props.items.map(function (value, index) {
            mouseState.push(false);
        });
        this.state = {
            mouseState: mouseState
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver(e) {
        let index = e.target.getAttribute("data");
        let mouseState = this.state.mouseState;
        mouseState[index] = true;
        this.setState({mouseState: mouseState});

    }

    handleMouseOut(e) {
        let index = e.target.getAttribute("data");
        let mouseState = this.state.mouseState;
        mouseState[index] = false;
        this.setState({mouseState: mouseState});
    }

    render() {
        let finished = 0;
        const total = this.props.items.length;
        const onCheckBoxClick = this.props.onCheckBoxClick;
        const onDeleteClick = this.props.onDeleteClick;
        const handleMouseOver = this.handleMouseOver;
        const handleMouseOut = this.handleMouseOut;
        const mouseState = this.state.mouseState;

        const items = this.props.items.map(function (value, index) {
            let content = value.content;
            let itemStyle = 'list-group-item';
            let deleteContent = "";
            if (value.finished) {
                finished++;
                content = <del>{value.content}</del>;
                itemStyle = 'list-group-item list-group-item-success';
            }

            if (mouseState[index]) {
                itemStyle = 'list-group-item list-group-item-success';
                deleteContent = "删除";
            }

            // Q2:<input type='checkbox' data-number={index} onClick={this.props.onCheckBoxClick}/>
            //会报错 为什么
            return <div key={index} data={index} className={itemStyle} id="item" onMouseMove={handleMouseOver}
                        onMouseLeave={handleMouseOut}>
                <div className='row'>
                    <div className='col-md-10'>
                        <input type='checkbox' className={index} onClick={onCheckBoxClick} checked={value.finished}/>
                        {content}
                    </div>
                    <div className='col-md-2'>
                        <span onClick={onDeleteClick} className={index} id='deleteBtn'>{deleteContent}</span>
                    </div>
                </div>

            </div>
        });

        return <div className="list-group">
            {items}
            <div className="list-group-item">
                <span>{finished}</span>已完成/<span>{total}</span>总数
            </div>
        </div>
    }
}

ReactDOM.render(<TodoList/>, document.getElementById("content"));