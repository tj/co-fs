
# co-fs

  Node core `fs` wrapped functions that return thunks for [co](https://github.com/visionmedia/co).

## Installation

```
$ npm install co-fs
```

## Example

  A naive half-finished copy function:

```js
var co = require('co');
var fs = require('co-fs');

copy('.', 'examples/dest', function(err){
  if (err) throw err;
  console.log('done');
});

function copy(src, dst, fn) {
  co(function *(){
    var files = yield fs.readdir(src);

    yield fs.mkdir(dst);

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var stat = yield fs.stat(file);
      if (!stat.isFile()) continue;
      var buf = yield fs.readFile(file);
      yield fs.writeFile(dst + '/' + file, buf);
    }

  })(fn);
}

```

## License

  MIT

