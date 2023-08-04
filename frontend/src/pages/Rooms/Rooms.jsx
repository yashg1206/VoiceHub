import React, { useState, useEffect } from 'react';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal'; //this is modal which will be created when we created when we clicked on add room button
import RoomCard from '../../components/RoomCard/RoomCard';  //importing room Card which are small cards 
import styles from './Rooms.module.css';
import { getAllRooms } from '../../http';

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
// ];

const Rooms = () => {
    const [showModal, setShowModal] = useState(false); //using useState ot make the AddRoomModal visible
    const [rooms, setRooms] = useState([]); //displaying all the room card created by the user

    useEffect(() => {   // it is used to gather all the rooms created in the database and displaying them in the rooms component
        const fetchRooms = async () => {
            const { data } = await getAllRooms();  // method created to get all the room 
            setRooms(data);
        };
        fetchRooms();
    }, []);

    function openModal() { // this means that we are creating the new room modal
        setShowModal(true);
    }
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                {/* this is the left part of the upper section  */}
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="search" />
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    {/* this is the right part of the upper section  */}
                    <div className={styles.right}>
                        <button
                            onClick={openModal}  // on clicking we are calling openModal so as to create new room
                            className={styles.startRoomButton}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>
                 {/* this is bacially the box which all the RoomCards */}
                <div className={styles.roomList}>
                    {rooms.map((room) => (  // here we are iterating to all the all the small room card and add rthem in the rooms component
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {/* in this we are calling AddRoomModal to show if clicked on start a room by checking showModal*/}
             {showModal && <AddRoomModal onClose={() => setShowModal(false)} />} 
             {/* here we are recieving props from the child which is AddRoomModal and it will close it if it is clicked on cross button */}
             </>
    );
};

export default Rooms;