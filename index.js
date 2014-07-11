/**
 * Module dependencies.
 */

var thunk = require('thunkify');
var fs = require('fs');
var stream = require('co-from-stream');
var anAysnc = require('an-async');

/**
 * Methods to wrap.
 */

var methods = [];

Object.keys(fs).forEach(function(method) {
    var meth = fs[method];
    if (anAysnc(meth)) {
        methods.push(meth);
    }
});

// wrap

methods.forEach(function(name) {
    if (!fs[name]) return;
    exports[name] = thunk(fs[name]);
});

// .exists is still messed

exports.exists = function(path) {
    return function(done) {
        fs.stat(path, function(err, res) {
            done(null, !err);
        });
    };
};

// .createReadStream

exports.createReadStream = function() {
    return stream(fs.createReadStream.apply(null, arguments));
};