require('dotenv').config({ path: __dirname + '/./../.env' });

const config = {
  dev: process.env.NODE_ENV !== 'production',
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || '',
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  credentialPath: process.env.CREDENTIAL_PATH,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  mailGunApiKey: process.env.MAILGUN_API_KEY,
  mailGunDomain: process.env.MAILGUN_DOMAIN,
  deBounceApiKey: process.env.DEBOUNCE_API_KEY,
  deBounceApiUrl: process.env.DEBOUNCE_API_URL,
};

module.exports = { config };
