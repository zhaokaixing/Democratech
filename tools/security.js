let bcrypt = require('bcrypt');
const jwt = require('express-jwt');

exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

exports.comparePassword = function(password, userPassword, callback) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};


exports.auth0Jwt = jwt({
  secret: new Buffer('p56rHBZt9mfIdfnjhmus5xUYXvt4-7Nk0cjylJcn8EgPDs76Ry0UpuyCKezQw3Ck', 'base64'),
  audience: '5Ai35bg5ZXeE2weSeXHUdf3KW5zwB4NF'
});

