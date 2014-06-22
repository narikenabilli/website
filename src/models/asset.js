module.exports = function(stacktic) {
  
  stacktic
  .model("Assets", function() {
      this.dataSource('fs', {
        src: 'assets/**/*'
      });
  });

};