import {useEffect,useRef,useState} from 'react';
export default promise => {
    let isMount = useRef(true);
    let [result,setResult] = useState(undefined);
    //加载
    useEffect(() => {
        promise.then(res => {
            if(!isMount.current){ return }
            setResult(() => {
                return res;
            });
        },res => {
            if(!isMount.current){ return }
            console.warn('error:' + res);
        });
        //卸载
        return () => {
            isMount.current = false;
        }
    },[]);

    //返回值
    return result;
}