// src/FileUpload.tsx

import React, {useState, ChangeEvent, FormEvent} from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('myFile', file);

    try {
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.status === 200) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to upload the file');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while uploading the file');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={onSubmit}>
        <input type='file' onChange={onChange} />
        <button type='submit'>Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
