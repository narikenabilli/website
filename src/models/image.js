module.exports = function(stacktic) {
  
  stacktic
  .model("Image", function() {
    this.dataSource('fs', {
      src: 'assets/img/*',
      stream: true
    });
  });

};