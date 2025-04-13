import React from 'react';
import ViewHeader from './viewHeader';

const DataViewHeaders = (headers) => {

    return (
        <div className={`headersLine ${headers.headers.isTitleLine ? 'titleLineHeaders' : ''}`}>
            {headers.headers.data.map((obj) => {
                return <ViewHeader headerData={obj}/>
            })}
        </div>
    );
}

export default DataViewHeaders;
