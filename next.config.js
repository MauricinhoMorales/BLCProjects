const withLess = require('@zeit/next-less');
module.exports = withLess({
  env: {
    MONGO_URL:
      'mongodb+srv://blcprojects:blcprojects@cluster0.jyqkp.mongodb.net/test?retryWrites=true&w=majority',
    secret: 'D4A2CC53A683D869B3ED14655B9AB',
    pusher: {
      app_id: '1102464',
      key: '537acd329f9297458cfe',
      secret: '250bf38023cec903f83e',
      cluster: 'us2',
    },
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
