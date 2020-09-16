import React from 'react';
import usePromise from 'use-promise';
//动态组件
export default (promise) => {
    //返回组件
    return props => {
        let Component = usePromise(promise);
        //render
        return Component ? <Component.default {...props}/> : null;
    }
};
