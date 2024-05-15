import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';

const TakePhoto = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageView, setImageView] = useState(false);
  const [imageData, setImageData] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setImageView(true)
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 400, 150);
    const imageData = canvasRef.current.toDataURL('image/png', 0.5);
    setImageData(imageData)
    setImageView(false)
  };



  return (
    <div style={{ maxHeight: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignItems: 'center' }}>

      <div style={{ alignSelf: 'center', zIndex: 10, marginTop: '-4%' }}>
        <Button color={"info"} size="small" onClick={startCamera}
          variant="contained">
          Abrir cámara
        </Button>
      </div>
      <br />
      <div style={{ flexDirection: 'row',  zIndex: 2, }}>
        <Button color={"secondary"} size="small" onClick={takePhoto}
          variant="contained" style={{marginRight: 2.5}}>
          Tomar foto
        </Button>
        <Button color={"secondary"} size="small" onClick={() => props.uploadPhoto(imageData)}
          variant="contained" style={{marginLeft: 2.5}}>
          Subir foto
        </Button>
      </div>
      <div style={{
        position: 'absolute', zIndex: imageView ? 1 : 0, borderRadius: "100%",
        border: "3px solid #01579B", maxHeight: "300px", maxWidth: "300px", justifyContent: 'center', alignContent: 'center', overflow: 'hidden',
        marginTop: '5%'
      }}>
        <video style={{
          height: '410px', width: '400px',
        }} ref={videoRef} autoPlay />

      </div>
      <div style={{
        position: 'absolute', zIndex: imageView ? 0 : 1, borderRadius: "100%",
        border: "3px solid #01579B", maxHeight: "300px", maxWidth: "300px", overflow: 'hidden',
        marginTop: '5%'
      }}>
        <canvas ref={canvasRef} style={{
          alignSelf: 'center',
          height: '300px', width: '300px'
        }} />
      </div>

    </div>
  );
};

export default TakePhoto;
