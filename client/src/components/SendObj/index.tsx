// React Component (e.g., App.tsx)
import React from 'react';

function objectToBase64(obj: any): string {
  return btoa(JSON.stringify(obj));
}

const SendObj: React.FC = () => {
  const sendObjectToBackend = async () => {
    const obj = {key: 'value'}; // replace with your object
    const base64Obj = objectToBase64(obj);

    try {
      const response = await fetch('http://localhost:5001/send-obj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: base64Obj}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendObjectToBackendByArray = async () => {
    const obj = {name: 'John', age: 30, city: 'New York'};

    // Serialize the object to JSON and convert to a Buffer
    const blob = new Blob([JSON.stringify(obj)], {
      type: 'application/octet-stream',
    });

    console.log(blob);

    //   try {
    //     const response = await fetch('http://localhost:5001/send-obj', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({data: base64Obj}),
    //     });

    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }

    //     const result = await response.json();
    //     console.log('Success:', result);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
  };

  return (
    <div>
      <button onClick={sendObjectToBackend}>Send Object to Backend</button>
      <button onClick={sendObjectToBackendByArray}>
        Send Object to Backend (By aray)
      </button>
    </div>
  );
};

export default SendObj;
