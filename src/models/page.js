module.exports = function(stacktic) {

  stacktic
  .model("Page", function() {
    this.dataSource('fs', {
      src: 'pages/**/*'
    });
    this.parseYfm();
    this.slug('title');
  });

};