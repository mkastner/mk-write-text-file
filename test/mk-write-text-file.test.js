const tape = require('tape');
const path = require('path');
const writeFile = require('../index.js');
const readFile = require('mk-read-text-file');
const deleteFile = require('mk-delete-file');
const fsStat = require('mk-fs-stat');
const testText = 'Testfile text';
const filePath = path.join('test/playground/testfile.txt');

async function main() {

  tape('clear target directory', async(t) => {

    try {
      t.plan(1);
      let statResult = await fsStat(filePath);
      
      if (statResult) {
        await deleteFile(filePath);
      }

      statResult = await fsStat(filePath);
      t.notOk(statResult, 'file should not exist');
      t.end();

    } catch (err) {
      
      console.error(err);
    }

  });

  tape('mk write text file', async (t) => {

    try {
      t.plan(3);
      let writeResult = await writeFile(filePath, testText);
      t.ok(writeResult);
      let readResult = await readFile(filePath, testText);
      t.equal(testText, readResult);
      t.ok(readResult);
      t.end();
    } catch(err) {

      console.error(err); 
    }
  });

}

main();
