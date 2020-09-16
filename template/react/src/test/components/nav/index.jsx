import React,{ useMemo} from 'react';
import usePromise from 'use-promise';
import './index.scss';
import Item from './item';
export default () => {
    let pages = usePromise(import('../../pages'));
    let navList = useMemo(() => {
        if(!pages) { return null }
        return Object.keys(pages.default).map(key => {
            return <Item key = {key} {...{
                path : `/${key}`
            }}>{key}</Item>
        });
    },[pages]);
    //render
    return <ul className="nav-board">
        {navList}
    </ul>
};