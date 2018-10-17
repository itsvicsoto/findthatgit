module.exports = function(app) {

  app.get('*', function(req, res) {
    console.log(__dirname + '/../app/dashboard');
    res.sendFile('index.html', {
      root: __dirname + '/../../app/dashboard'
    });
  });

};
