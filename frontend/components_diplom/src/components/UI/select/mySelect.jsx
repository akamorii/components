import React from 'react';
import classes from './mySelect.module.css'


const MySelect = ({children, ...props}) => {

    console.log(props, children);
    return (
        <select {...props} className={classes.mySelect}>
            {children}
        </select>
    );
}

// zxc
export default MySelect;
