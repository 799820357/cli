import React from 'react';
import './index.scss';
import dynamicComponent from 'dynamic-component';
const Nav = dynamicComponent(import('../nav'));
const Header = dynamicComponent(import('../header'));
const Page = dynamicComponent(import('../page'));
export default props => {
    //render
    return <div className="layout-board">
        <Header {...props}/>
        <div className="content-board">
            <Nav {...props}/>
            <Page {...props}/>
        </div>
    </div>
};