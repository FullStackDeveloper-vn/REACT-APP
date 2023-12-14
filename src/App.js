import React, { useState } from 'react';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let xxx = 'kkk';
  const handleUpload = () => {
    // Create a FormData object to store the file data
    const formData = new FormData();
    formData.append('file', selectedFile);
    // console.log(formData.getAll('file'));

    // Send the file to the server using fetch or any other AJAX library
    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response)
      .then((result) => {
        // Handle the response from the server
        console.log(result);
        xxx = result
      })
      .catch((error) => {
        // Handle any errors that occur during the upload process
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUpload}>Upload</button>
      <p> Hoang {xxx} </p>
    </div>
  );
};
