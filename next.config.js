const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
module.exports = {
  env: {
    MONGO_URL: "mongodb+srv://blcprojects:blcprojects@cluster0.jyqkp.mongodb.net/test?retryWrites=true&w=majority"
  }
}
