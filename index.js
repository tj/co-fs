
/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Wrap `fn`.
 *
 * @param {Function} fn
 * @return {Function}
 * @api private
 */

function wrap(fn, ctx) {
  return function(){
    var args = [].slice.call(arguments);
    return function(done){
      args.push(done);
      fn.apply(ctx || this, args);
    }
  }
}

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
  if (!fs[name]) throw new Error('fs.' + name + ' does not exist');
  exports[name] = wrap(fs[name]);
});

// .exists is still messed

exports.exists = function(path){
  return function(done){
    fs.stat(path, function(err, res){
      done(null, !err);
    });
  }
};
