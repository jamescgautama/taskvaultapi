const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'app.log'), { flags: 'a' });

const stream = {
    write: function (message) {
        process.stdout.write(message);
        accessLogStream.write(message);
    }
};

module.exports = { stream };
