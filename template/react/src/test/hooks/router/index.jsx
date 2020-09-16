import dynamicComponent from 'dynamic-component';
import usePromise from 'use-promise';
import { Route, Redirect} from 'react-router-dom';
import React,{useMemo} from 'react';
//页面组件
let Page = props => {
    let Component = useMemo(() => {
        return dynamicComponent(import(`../../pages/${props.path}`));
    },[props.path]);
    //render
    return <Component {...props}/>
};
export default (promise,props) => {
    let result = usePromise(promise);
    let component = useMemo(() => {
        if(!result){ return null }
        let defaultPage = null;
        let allPages = Object.keys(result.default).map(key => {
            let item = result.default[key];
            //判断默认页
            if(item.default){
                defaultPage = <Route path='/' exact render={ r => <Redirect to={'/' + key}/>}/>
            }
            return <Route 
                key={key} 
                exact = {true} 
                strict = {true}
                path = {'/' + key} 
                render = {info => {
                    return <Page {...props} {...info} path = {item.path}/>
                }}
            />;
        });
        return <>
            {defaultPage}
            {allPages}
        </>
    },[result,props]);
    //render
    return component
};