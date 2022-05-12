import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class CheckItem extends Component{
    static defaultProps = {
        text: ''
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    render() {
        let { text, checkedHandle, val, id, deleteItem } = this.props
        return (
            <div className="item-box">
                <div>
                    <input type="checkbox"
                           checked={val}
                           onChange={(e)=> checkedHandle(e.target.checked, id)}/>
                    {text}
                </div>
                <button className="delBtn" onClick={() => deleteItem(id)}>删除</button>
            </div>
        )
    }
}
