import React, { Component } from 'react';
import './index.css';
import CheckItem from "../checkItem";

export default class Todo extends Component{
    state = {
        inputVal: '',
        dataArr: []
    }

    /**
     * 设置添加项目输入值
     * */
    setInputVal = (e) => {
        this.setState({inputVal: e.target.value})
    }
    /**
     * 添加内容
     * */
    addItem = () => {
        let { dataArr, inputVal } = this.state
        if (!inputVal) return
        this.setState({dataArr: [{ text: inputVal, val: false, id: new Date().getTime()}, ...dataArr]})
    }

    /**
    * 子选项添加事件
    * */
    childItemAddHandle = (checked, id) => {
        let { dataArr } = this.state
        dataArr.forEach((item) => {
            if (item.id === id) {
                item.val = checked
            }
        })
        this.setState({dataArr})
    }
    /**
    * 子选项删除事件
    * */
    deleteItem = (id) => {
        let { dataArr } = this.state
        dataArr = dataArr.filter((item) => {
            return item.id !== id
        })
        this.setState({dataArr})
    }

    /**
     * 清除已完成
     * */
    clearAll = () => {
        let { dataArr } = this.state
        dataArr = dataArr.filter((item) => {
            return !item.val
        })
        this.setState({dataArr})
    }

    /**
     * 全选选项
     * */
    selectAll = (checked) => {
        let { dataArr } = this.state
        dataArr.forEach((item) => {
            item.val = checked
        })
        this.setState({dataArr})
    }

    render() {
        let { inputVal, dataArr } = this.state
        let selectdArr = dataArr.reduce((arr, currenItem) => {
            return currenItem.val ? [...arr,currenItem] : arr;
        }, [])
        return (
            <div className='welcome'>
                {/*头部输入框*/}
                <div className="header-box">
                    <input type="text"
                           value={inputVal}
                           onInput={this.setInputVal}/>
                    <button onClick={this.addItem}>添加</button>
                </div>
                {/*列表项*/}
                <div>
                    {
                        dataArr.map((item) => {
                          return <CheckItem {...item}
                                            checkedHandle={this.childItemAddHandle}
                                            deleteItem={this.deleteItem}
                                            key={item.id}/>
                        })
                    }
                </div>
                {/*底部功能项*/}
                <div className="footer-box">
                    <div>
                        <input type="checkbox"
                               onChange={(e) => this.selectAll(e.target.checked)}/>已完成{selectdArr.length}/全部{dataArr.length}
                    </div>
                    <button onClick={this.clearAll} className="delBtn">清除所有已完成选项</button>
                </div>
            </div>
        )
    }
}
