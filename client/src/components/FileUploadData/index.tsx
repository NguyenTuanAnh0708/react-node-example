// src/FileUpload.tsx

import React, {useState, ChangeEvent, FormEvent, useRef} from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const imgRef = useRef<HTMLImageElement | null>(null);

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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (
        reader.result &&
        typeof reader.result === 'string' &&
        imgRef.current
      ) {
        imgRef.current.src = reader.result;
        const base64String = reader.result.replace(/^data:.+;base64,/, ''); // Remove prefix

        const data = {
          fileContent: base64String,
          name: file.name,
          mimeType: file.type,
        };

        fetch('http://localhost:5001/file/insert', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={onSubmit}>
        <input type='file' onChange={onChange} />
        <button type='submit'>Upload</button>
      </form>

      <img ref={imgRef} src='' alt='' />
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
