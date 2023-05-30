import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/monkey-avatar.png');
    function captureImage(e) {
        const file = e.target.files[0];   // importing the image part from the data which we have selected
        const reader = new FileReader();   //syntax of reader function
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);    // setting the image
            dispatch(setAvatar(reader.result));   //sending the data to activateslice in sore to strore all the  data in temperory storage
        };
    }
    async function submit() {
        try {
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Card title={`Okay, ${name}`} icon="monkey-emoji">
                <p className={styles.subHeading}>How’s this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input   // here we are linking input and label both of them so as to select the req file
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"    // input type is file
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepAvatar;
