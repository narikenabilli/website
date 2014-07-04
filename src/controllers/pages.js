var fs = require('fs');

module.exports = function(stacktic) {
  
  stacktic
  .controller('Pages', function() {
    this.context.version = JSON.parse(fs.readFileSync('node_modules/stacktic/package.json', {encoding: 'utf8'})).version;
    
    this.context.nav = this.models.Page.where({
      nav: true
    });
    
    this.route("/", this.models.Page.where({
      slug: "home"
    })).render('hbs').context({
      isHome: true
    });

    this.route("/:{$slug}/", this.models.Page.reject({
      slug: "home"
    })).render('hbs').render('toc', {
      container: '.content',
      levels: ['h2', 'h3']
    });

  });

};

