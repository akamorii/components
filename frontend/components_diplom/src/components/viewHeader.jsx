import React from 'react';

const ViewHeader = (headerData) => {
    return (
        <div className='header' style={{width: headerData.headerData.piece}}>
            {headerData.headerData.name}
        </div>
    );
}

export default ViewHeader;
