var stacktic = require('stacktic');

stacktic({
  src: 'src',
  dest: 'out',
  less: {
    paths: ['bower_components', '_site/assets/less'],
    compress: false
  }
})
.use('./src/models/page')
.use('./src/models/vendor')
.use('./src/models/asset')
.use('./src/controllers/pages')
.use('./src/controllers/assets')
.build(done);