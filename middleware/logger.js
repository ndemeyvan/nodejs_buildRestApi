function auth(req, res, next) {
    console.log("Loggin middleware");
    next();
  }
  
  module.exports = auth;
  