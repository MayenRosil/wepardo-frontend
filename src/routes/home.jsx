import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/root.css';
import ResponsiveAppBar from '../components/UI-home/navBar';
import MainContent from '../components/UI-home/homecontent';


const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const sessionToken = (localStorage.getItem('sessionToken'));
        if(!sessionToken) navigate('/signin');
        navigate('/home');
    }, [navigate])

    return (
      <>
        <ResponsiveAppBar />
        <MainContent />
      </>
    )
}
  export default Home;