import React from 'react';
import classes from './mybutton.module.css';

const Mybutton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {props.children}
        </button>
    );
}

export default Mybutton;
