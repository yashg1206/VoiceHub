import React from 'react';
import styles from './RoomCard.module.css';
import { useHistory } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const history = useHistory();
    return (
        <div
            onClick={() => {
                history.push(`/room/${room.id}`);  // by clicking on this we are going in that prticular room
            }}
            className={styles.card}
        >
        {/* this is the heading of the individual roomCard */}
            <h3 className={styles.topic}>{room.topic}</h3>  
            <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                {/* this is showing the images of the creators who are creating a room */}
                <div className={styles.avatars}>
                    {room.speakers.map((speaker) => ( // here also we are iterating so we have to give the key
                        <img
                            key={speaker.id}  // required key
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                {/* this is showing the names of the creators who are creating a room */}
                <div className={styles.names}>
                    {room.speakers.map((speaker) => ( // here also we are iterating so we have to give the key
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/images/chat-bubble.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
           {/* this div basically contains all the information at the end of single card */}
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/images/user-icon.png" alt="user-icon" />
            </div>
        </div>
    );
};

export default RoomCard;