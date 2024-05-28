import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Welcome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authent } = location.state || { authent: 'not' };
    // const {auth} = location.state.authent || {authent : 'not'}
    const { user } = location.state || { user: 'notfound' }; // Get the user value from the state

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate('/', { state: { user: user, authent: "True" } });
        }, 2000); // 2000 milliseconds = 2 seconds

        return () => clearTimeout(redirectTimer); // Clear the timer if the component unmounts
    }, [navigate]);

    return (
        <div className='mt-[15%]'>
            <h1 className='text-7xl mb-10'>
                Welcome to the website {localStorage.getItem('user_name')}
            </h1>
            <img className='w-[10%] h-[10%] mx-auto' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png' alt='Checkmark'></img>
        </div>
    );
};

export default Welcome;
