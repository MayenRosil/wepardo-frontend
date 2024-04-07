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
    const imageData = canvasRef.current.toDataURL('image/png');
    setImageData(imageData)
  };

  const uploadPhoto = async () => {
    let cuerpo = {
        base64image: imageData,
        username: 'mayenrosil',
        exist: props.imagenExiste
    }
    console.log(cuerpo)
    await fetch('http://localhost:3001/api/auth/uploadImage', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
            'Content-Type': "application/json"
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
    <div>
      <button onClick={startCamera}>Abrir cámara</button>
      <br />
      <video ref={videoRef}  autoPlay />
      <canvas ref={canvasRef}  />
      <br />
      <button onClick={takePhoto}>Tomar foto</button>
      <button onClick={uploadPhoto}>Subir foto</button>
    </div>
  );
};

export default TakePhoto;
