require('dotenv').config({ path: __dirname + '/./../.env' });

const config = {
  dev: process.env.NODE_ENV !== 'production',
  url: process.env.URL || 'http://localhost:3000',
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || '',
  sendinblueApiKey: process.env.SENDINBLUE_API_KEY,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  mesiboAccessToken: process.env.MESIBO_ACCESS_TOKEN,
  mesiboAppId: process.env.MESIBO_APP_ID,
  mesiboApiUrl: process.env.MESIBO_API_URL,
};

module.exports = { config };
