import React from 'react';
import styles from './TextInput.module.css';

const TextInput = (props) => {
    return (
        <div>
             <input // here we are checking if fullwidth coming as props is true then do it true else do the prev one 
                className={styles.input}
                style={{
                    width: props.fullwidth === 'true' ? '100%' : 'inherit',
                }}
                type="text"
                {...props}
            />
        </div>
    );
};

export default TextInput;
