module.exports = function(stacktic) {
  
  stacktic
  .model("Font", function() {
    this.dataSource('fs', {
      base: 'bower_components',
      src: ['roboto-fontface/fonts/*', 'fontawesome/fonts/*'],
      stream: true
    });
  });

};