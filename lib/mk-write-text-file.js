/* jslint node: true, strict:implied, esversion: 6 */

const fs = require('fs'),
    onError = require('mk-log/lib/mk-on-error');

/**
 * write text files as promise
 * @param  {String} path the path of the target file
 * @param  {String} s    the file content which should be written
 * @return {Promise}     the promise
 */
function writeFile(path, s) {

    return new Promise(function(resolve, reject) {

        fs.writeFile(path, s, function(err) {

            if (err) {
                reject(err);
            }

            resolve({status: 'success'});

        });

    }).catch(onError);
}

module.exports = writeFile;
