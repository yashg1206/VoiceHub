import React, { useState } from 'react';
import styles from './AddRoomModal.module.css';
import TextInput from '../shared/TextInput/TextInput';  //import TextInput for imputing anythong
import { createRoom as create } from '../../http';
import { useHistory } from 'react-router-dom';


const AddRoomModal = ({ onClose }) => {
    const history = useHistory();

    const [roomType, setRoomType] = useState('open'); // this is for highlighting a particular box whode default is open
    const [topic, setTopic] = useState(''); // this is to store the input which we are typing in the box
   
    // this is server call asking it to create the room
    async function createRoom() {
        try {
            if (!topic) return;
            const { data } = await create({ topic, roomType });
            history.push(`/room/${data.id}`); // redireting to the room page to which server is called
        } catch (err) {
            console.log(err.message);
        }
    }
 // we will divide whole card here into 2 sections modalheader and modalfooter
    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
            {/* this is the cross * which is displaying top right*/}
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        Enter the topic to be disscussed
                    </h3>
                    <TextInput
                        fullwidth="true" //making the input feild full width
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                     {/* this is the heading which is displaying room types */}
                    <h2 className={styles.subHeading}>Room types</h2>

                    {/* this div contains all the 3 boxes */}
                    <div className={styles.roomTypes}>
                       {/* this div is one of 3 boxes and contains open word */}
                        <div
                            onClick={() => setRoomType('open')}  //on clicking on it it will set setRoonType with its corresponding box
                            className={`${styles.typeBox} ${
                                roomType === 'open' ? styles.active : '' // if usestate of this is true then activate active class in css
                            }`}
                        >
                            <img src="/images/globe.png" alt="globe" />
                            <span>Open</span>
                        </div>

                        {/* this div is one of 3 boxes and contains Social word */}
                        <div
                            onClick={() => setRoomType('social')}
                            className={`${styles.typeBox} ${
                                roomType === 'social' ? styles.active : ''
                            }`}
                        >
                            <img src="/images/social.png" alt="social" />
                            <span>Social</span>
                        </div>

                        {/* this div is one of 3 boxes and contains Private word */}
                        <div
                            onClick={() => setRoomType('private')}
                            className={`${styles.typeBox} ${
                                roomType === 'private' ? styles.active : ''
                            }`}
                        >
                            <img src="/images/lock.png" alt="lock" />
                            <span>Private</span>
                        </div>

                    </div>
                </div>

                {/* this is the header footer */}
                <div className={styles.modalFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button
                        onClick={createRoom}
                        className={styles.footerButton}
                    >
                        <img src="/images/celebration.png" alt="celebration" />
                        <span>Let's go</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddRoomModal;