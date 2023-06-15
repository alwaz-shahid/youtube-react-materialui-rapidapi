import React from 'react';

export default function Convert() {
  const handleConvert = () => {
    const apiUrl = 'http://localhost:3000/convert'; // Replace with your API endpoint URL

    const urlParam = new URLSearchParams();
    urlParam.append('url', 'https://youtu.be/nD_NDngrEl8'); // Replace with a valid YouTube video URL

    fetch(`${apiUrl}?${urlParam}`)
      .then((response) => {
        if (response.ok) {
          console.log('Conversion successful'); // Successful conversion
          // Handle the response or perform additional actions
        } else {
          console.error('Conversion failed'); // Failed conversion
          // Handle the error or perform additional actions
        }
      })
      .catch((error) => {
        console.error('Request error:', error); // Request error
        // Handle the error or perform additional actions
      });
  };

  return (
    <div>
      <button onClick={handleConvert}>Convert Video</button>
    </div>
  );
}
