const withLess = require('@zeit/next-less');
module.exports = withLess({
  env: {
    DEV: 'dev',
    CORS: '*',
    DB_USER: 'blcprojects',
    DB_PASSWORD: 'blcprojects',
    DB_HOST: 'cluster0.jyqkp.mongodb.net',
    DB_NAME: 'blcprojects',
    DB_PORT: null,
    EMAIL: '',
    EMAIL_PASSWORD: '',
    AUTH_JWT_SECRET: 'lm7Etue9W4IUDfGchLnjXdOv6ZpBV0K8',
    PUBLIC_API_KEY_TOKEN:
      '2e119f7eb1aa1c95e4ece5737d211a80f8bd6e1db50a7f804b9cdf11083653ed',
    ADMIN_API_KEY_TOKEN: '',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
});
