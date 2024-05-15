import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const sessionToken = (localStorage.getItem('sessionToken'));
        if(!sessionToken) navigate('/signin');
        navigate('/home');
    }, [navigate])

    return (
      <>
        <h1>Home</h1>
      </>
    );
  }

  export default Home;