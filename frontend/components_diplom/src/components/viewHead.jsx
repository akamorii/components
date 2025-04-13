import React from 'react';
import Mybutton from './UI/button/mybutton';
import MyInput from './UI/input/myInput';
import MySelect from './UI/select/mySelect';

const ViewHead = () => {
    return (
        <div className='viewHead'>
            {/* <MyInput/> */}
            <MySelect style={{width: '200px'}}>
                <option value="value1">A-z</option>
            </MySelect>
            <Mybutton style={{width: '180px', height: '30px', position:'relative', left: '40px', top: '35%'}}>zxc</Mybutton>

        </div>
    );
}

export default ViewHead;
