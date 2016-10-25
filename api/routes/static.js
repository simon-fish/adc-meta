var Path = require('path');

module.exports = [
    {
        path: '/webapp/{param*}',
        method: 'GET',
        handler: {
            directory: {path: Path.join(__dirname, '../../web')}
        }
    },
];