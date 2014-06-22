module.exports = function(stacktic) {

  stacktic
  .controller('Assets', function() {

    this.route("/assets/css/main.css", this.models.Assets.where({
      $fs: {
        basename: 'main.less'
      }
    })).render('less');
    
    this.route("/assets/js/main.js", this.models.Assets.where({
      $fs: {
        basename: 'main.js'
      }
    })).render('hbs', { layout: false });

  });

};