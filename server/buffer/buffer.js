const fs = require('fs');
const path = require('path');

// Đường dẫn tới tệp hình ảnh đầu vào và tệp đầu ra
const inputFilePath = path.join(__dirname, 'Nguyen Tuan Anh.pdf');
const outputFilePath = path.join(__dirname, 'base64.txt');

// Đọc tệp hình ảnh
fs.readFile(inputFilePath, (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Chuyển đổi tệp PDF thành Base64
    const base64Pdf = data.toString('base64');

    // Tạo chuỗi dữ liệu Base64 với kiểu MIME
    const base64String = `data:application/pdf;base64,${base64Pdf}`;

    // Ghi chuỗi Base64 vào tệp văn bản
    fs.writeFile(outputFilePath, base64String, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('Base64 data has been written to', outputFilePath);
    });
});
