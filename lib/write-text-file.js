/* jslint node: true, strict:implied, esversion: 6 */

var fs = require('fs');

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

            resolve({status: 'ok'})

        });

    });
}