import { useState, useEffect } from 'react';
export default (className,options) => {
    let [name,setName] = useState(null);
    useEffect(() => {
        let name = className ? className.split(' ') : [];
        if(typeof options == 'string'){
            name.push(options);
        }else if(typeof options == 'object'){
            Object.keys(options).forEach(key => {
                let index = name.indexOf(key);
                if(options[key] && index < 0){
                    name.push(key);
                }else if(!options[key] && index > -1){
                    name.splice(index,1);
                }
            });
        };
        //是否添加样式
        setName(name.join(' ')); 
    },[className,options]);
    //返回
    return name;
}