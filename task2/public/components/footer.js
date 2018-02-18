import React from 'react';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    handleClick(){
        let content = this.refs.textInput.value;
        if(!content){
            alert("输入不得为空！")
        }else
            this.props.onSaveTask(content);

        this.refs.textInput.value = "";
    }

    handleKeyUp(e){
        if (e.keyCode == 13) {
            this.handleClick();
        }
    }

    render(){
        return  <div className='footer form-horizontal'>
            <div className="form-group">
                <label className="col-md-2 control-label">Task</label>
                <div className="col-md-10">
                    <input className='form-control' type="text" placeholder="你想做点什么" ref="textInput"
                           onKeyUp={this.handleKeyUp.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-md-offset-10 col-md-2">
                    <button onClick={this.handleClick.bind(this)} className="btn btn-primary">Save Task</button>
                </div>
            </div>
        </div>
    }
}