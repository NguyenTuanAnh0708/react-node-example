import React from 'react';

const BlobUi: React.FC = () => {
  const handleDownload = () => {
    const data: string = 'Hello, world!';
    const blob: Blob = new Blob([data], {type: 'text/plain'});
    const url: string = URL.createObjectURL(blob);

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = 'hello.txt';
    link.click();

    // Giải phóng URL sau khi sử dụng
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default BlobUi;
