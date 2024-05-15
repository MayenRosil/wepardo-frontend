import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';

export default function Root() {

    const navigate = useNavigate();

    useEffect(() => {
        const sessionToken = (localStorage.getItem('sessionToken'));
        if(!sessionToken) navigate('/signin');
        navigate('/home');
    }, [navigate])

    return (
      <>
        <div className="loader"></div>
      </>
    );
  }