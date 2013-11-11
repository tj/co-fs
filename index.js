
/**
 * Module dependencies.
 */

var thunk = require('thunkify');
var fs = require('fs');

/**
 * Methods to wrap.
 */

var methods = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile'
];

// wrap

methods.forEach(function(name){
  if (!fs[name]) return;
  exports[name] = thunk(fs[name]);
});

// .exists is still messed

exports.exists = function(path){
  return function(done){
    fs.stat(path, function(err, res){
      done(null, !err);
    });
  }
};
