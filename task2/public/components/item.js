import React from 'react';


export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mouseState:false
        }
    }

    onItemClick(){
        this.props.onItemClick(this.props.number);
    }

    onMouseMove(){
         this.setState({
             mouseState:true
         })
    }

    onMouseLeave(){
        this.setState({
            mouseState:false
        })
    }

    onDeleteClick(){
        this.props.onDeleteClick(this.props.number);

    }

    render(){
        let style='';
        let deleteBtn="";
        let contentStyle=<span className="taskContent">{this.props.content}</span>;
        if(this.props.finished){
            style="list-group-item list-group-item-success";
            contentStyle=<span className="taskContent"><del>{contentStyle}</del></span>;
        }else{
            style=this.state.mouseState?"list-group-item list-group-item-success":"list-group-item";
        }

        deleteBtn =this.state.mouseState?"删除":"";


        return<div className={style} onMouseLeave={this.onMouseLeave.bind(this)} onMouseMove={this.onMouseMove.bind(this)}>
            <div className='row'>
                <div className='col-md-10' id='item'>
                    <input type='checkbox'  onClick={this.onItemClick.bind(this)} checked={this.props.finished} readOnly/>
                    {contentStyle}
                </div>
                <div className='col-md-2'>
                    <span  id='deleteBtn' onClick={this.onDeleteClick.bind(this)}>{deleteBtn}</span>
                </div>
            </div>
        </div>

    }


}