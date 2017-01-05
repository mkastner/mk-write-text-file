/* jslint node: true, strict:implied, esversion: 6 */

var tape = require('tape'),
    path = require('path'),
    onError = require('mk-log/lib/mk-on-error'),
    writeFile = require('../index.js'),
    readFile = require('mk-read-text-file'),
    deleteFile = require('mk-delete-file'),
    fsStat = require('mk-fs-stat'),
    testText = "Testfile text",
    filePath = path.join(path.resolve('./'), 'test/playground/testfile.txt');

tape('clear target directory', function(t) {

    async function run() {

        t.plan(1);
        let statResult = await fsStat(filePath);

        if (statResult.status === 'success') {
            await deleteFile(filePath);
        }

        statResult = await fsStat(filePath);
        t.equal('failure', statResult.status);
        t.end();

    }

    run().catch(onError);

});

tape('mk write text file', function(t) {

    async function run() {
        t.plan(3);
        var writeResult = await writeFile(filePath, testText);
        t.equal('success', writeResult.status);
        var readResult = await readFile(filePath, testText);
        t.equal(testText, readResult.text);
        t.equal('success', readResult.status);
        t.end();
    }

    run().catch(onError);

});
