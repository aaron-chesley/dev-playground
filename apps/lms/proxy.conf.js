const TARGET = 'http://127.0.0.1:8000';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: TARGET,
    secure: false,
    ws: false,
  },
];

module.exports = PROXY_CONFIG;
