var Path = require('em').Path;
var path = Path.create('/foo').join('bar/docroot/').join('index.html');
console.log('dirname: '+path.dirname());         // Returns '/foo/bar/docroot'
console.log('pathname: '+path.basename('.html')); // Returns 'index'
