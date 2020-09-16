import React from 'react';
import {withRouter} from 'react-router-dom';
import useClassName from 'use-class-name';
export default withRouter(props => {
    let className = useClassName('',{
        on : props.location.pathname == props.path
    });
    let handleClick = () => {
        if(props.location.pathname == props.path){ return }
        props.history.push(props.path);
    };
    return <li className = {className}>
        <span onClick = {handleClick}>{props.children}</span>
        {/* <Link to = {props.path}>{props.children}</Link> */}
    </li>
})