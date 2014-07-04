module.exports = function(stacktic) {
  
  stacktic
  .controller('Sitemap', function() {
    this.route("/sitemap.xml")
    .context(function(){
      this.$sitemapItems = this.models.Page
    })
    .render( 'sitemap' );
  });

};

