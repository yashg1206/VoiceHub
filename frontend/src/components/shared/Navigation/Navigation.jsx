import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);

    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>Dragonite</span>
            </Link>
         {/* now here it is the right side of thr navbar which includes profile photo and submit button */}
            {isAuth && (
                <div className={styles.navRight}> 
                    <h3>{user?.name}</h3>
                    {/* this is the link which will redirect to home page when we click on it */}
                    <Link to="/">  
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button  //creating button on the navabr for logging-out
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />   
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;