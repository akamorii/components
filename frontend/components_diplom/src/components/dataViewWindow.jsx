import React, { useRef, useState } from 'react';
import './../styles/app.css'
import DataViewHeaders from './dataViewHeaders';
import ViewHead from './viewHead';


const DataViewWindow = (...props) => {

    const [allHeaders, setHeaders] = useState([
        {
            'isTitleLine': true,
            data: [
                {id: 1, piece: '10%', name: 'имя'},
                {id: 2, piece: '40%', name: 'количество'},
                {id: 3, piece: '30%', name: 'цена'},
                {id: 4, piece: '20%', name: 'гитлер'},
            ]
        },
        {
            'isTitleLine': false,
            data: [
                {id: 1, piece: '10%', name: 'имя'},
                {id: 2, piece: '40%', name: 'количество'},
                {id: 3, piece: '30%', name: 'цена'},
                {id: 4, piece: '20%', name: 'гитлер'},
            ]
        },
        {
            isTitleLine: false,
            data: [
                {id: 1, piece: '10%', name: 'имя'},
                {id: 2, piece: '40%', name: 'количество'},
                {id: 3, piece: '30%', name: 'цена'},
                {id: 4, piece: '20%', name: 'гитлер'},
            ]
        },
]);



    // console.log(allHeaders);

    return (
        <div className='main-view-container'>
            <div className='main-view'>
                <ViewHead/>
                {allHeaders.map((obj) => {
                    return <DataViewHeaders headers={obj}/>
                })}
            </div>
        </div>
    );
}

export default DataViewWindow;
