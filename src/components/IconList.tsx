import React from 'react';
import { Link } from 'react-router';

export type JSONIcon =
{
    src:string;
    url:string;
    alt:string;
};

export function IconsList({list, clickable} : {list : Array<JSONIcon>, clickable:boolean}) {

    const iconItems = list.map(icon =>
        <>
        {clickable ? 
        <Link to={icon.url} className="clickable">
            <img src={icon.src} alt={icon.alt} className="icons-list-item"/>
        </Link>
        :
        <img src={icon.src} alt={icon.alt} className="icons-list-item"/>}
        </>);

    return (
    <div className="icons-list-container">
        <div className="icons-list">
            {iconItems}
        </div>
    </div>
    )
}