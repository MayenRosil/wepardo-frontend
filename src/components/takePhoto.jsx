import React, { useRef, useState } from 'react';

const TakePhoto = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png', 0.05);
    setImageData(imageData)
  };

  const uploadPhoto = async () => {
    let cuerpo = {
      base64image: imageData,
      username: 'mayenrosil',
      exist: props.imagenExiste
    }
    console.log(cuerpo)
    await fetch('https://wepardo.services/api/auth/uploadImage', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': "application/json",
        'Content-Length': JSON.stringify(cuerpo).length
      },
      body: JSON.stringify(cuerpo)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud falló');
        }
        return response.json(); // Convertir la respuesta a formato JSON
      })
      .then(data => {
        // Aquí puedes trabajar con los datos obtenidos
        console.log(data);
      })
      .catch(error => {
        // Manejar errores
        console.error('Ocurrió un error:', error);
      });

  }

  return (
    <div style={{ maxHeight: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'red', alignItems: 'center' }}>
      <button style={{ alignSelf: 'flex-start' }} onClick={startCamera}>Abrir cámara</button>
      <br />
      <video style={{ height: '100px', width: '100px' }} ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ height: '100px', width: '100px' }} />
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={takePhoto}>Tomar foto</button>
        <button onClick={uploadPhoto}>Subir foto</button>
      </div>
    </div>
  );
};

export default TakePhoto;
