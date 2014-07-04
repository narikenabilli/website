module.exports = function(stacktic) {

  stacktic
  .controller('Assets', function() {
    this.context.stylesheets = this.models.Assets.where({
      $fs: {
        basename: 'main.less'
      }
    });

    this.context.scripts = this.models.Assets.where({
      $fs: {
        basename: 'main.js'
      }
    });

    this.route("/assets/css/main.css", this.context.stylesheets).render('less', {
      compress: stacktic.config.get('minify')
    });
    
    var jsRoute = this.route("/assets/js/main.js", this.context.scripts)
    .render('hbs', { layout: false });
    
    if (stacktic.config.get('minify')) {
      jsRoute.render('uglify');
    }

    this.route("/assets/img/:{$fs.basename}", this.models.Image).render(false);
    this.route("/assets/fonts/:{$fs.basename}", this.models.Font).render(false);
    
  });

};