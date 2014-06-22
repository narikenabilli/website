module.exports = function(stacktic) {
  
  stacktic
  .model("Vendor", function() {
    return this.dataSource('fs', {
      base: 'bower_components',
      src: ['jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js']
    });
  });

};