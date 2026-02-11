const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../uploads/qr-codes');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const generateQR = async (code, location = null) => {
    let qrData = {
        code: code,
        timestamp: new Date().toISOString()
    };

    if (location) {
        qrData.location = {
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
            address: location.address
        };
    }

    const qrString = JSON.stringify(qrData);
    const filename = `qr-${code}-${Date.now()}.png`;
    const filepath = path.join(uploadsDir, filename);

    await QRCode.toFile(filepath, qrString, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    });
    
    return `/uploads/qr-codes/${filename}`;
}

const generateCustomQR = async (data) => {
    const qrString = JSON.stringify(data);
    const filename = `qr-custom-${Date.now()}.png`;
    const filepath = path.join(uploadsDir, filename);
    
    await QRCode.toFile(filepath, qrString, {
        width: 300,
        margin: 2
    });
    
    return `/uploads/qr-codes/${filename}`;
}

module.exports = { generateQR, generateCustomQR };