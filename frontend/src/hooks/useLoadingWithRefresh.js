import { useState, useEffect } from 'react'; // this is called when we refresh the page from the app.js file so that after refreshing the page no doc is lostand we are logiined in and not directed to home page
import axios from 'axios';
import { useDispatch } from 'react-redux';   
import { setAuth } from '../store/authSlice';
export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,  //sending this to backend to generate the access and refresh token
                    {
                        withCredentials: true,  // to send he cookies
                    }
                );
                dispatch(setAuth(data));  //ending this to setAuth in authslice in store
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}