import fs from 'fs';
import {ncp} from 'ncp';
import rimraf from 'rimraf';
import path from 'path';

const origHTMLPath = path.join(__dirname, '../build/index.html');
let html = fs.readFileSync(origHTMLPath,{encoding:'utf-8'});

const pathProcess = (path) => path.replace(/static\//g, '');

// const cssPattern = 'href="([^"]*\/static\/[^"]*)"';
// const jsPattern = 'src="([^"]*\/static\/[^"]*)"';

const indexSource = path.join(__dirname, '../build/index.html');
const indexDest = path.join(__dirname, '../../server/views/index.html');

const resSource = path.join(__dirname, '../build/static');
const resDest = path.join(__dirname, '../../server/public/resources/static');

const processSingleTagError = (html) => {
    console.log('process Single Tag Deletion ...');
    const sinTagExp = /<link (.(?![<]))*[^/]>/g;
    let resHtml = html;
    const matches = resHtml.match(sinTagExp);
    matches.forEach(match => {
        const replaceStr = match.substring(0, match.length-1) + '/>';
        resHtml = resHtml.replace(new RegExp(match, 'g'), replaceStr);
    });
    console.log('done');
    return resHtml;
}

const processPath = (path, html) => {
    console.log(`process pattern replacing for...${path}`);
    const pattern = new RegExp(path);
    const patternG = new RegExp(path, 'g');

    const matchesG = html.match(patternG);
    let resHtml = html;
    if(!matchesG)
        return resHtml;
    matchesG.forEach(match => {
        const recMatch = match.match(pattern);
        const curledRecMatch = pathProcess(recMatch[1]);
        resHtml = resHtml.replace(new RegExp(recMatch[1], 'g'), curledRecMatch);
    });
    console.log('done');
    return resHtml;    
};

html = processSingleTagError(html);
// html = processPath(cssPattern, html);
// html = processPath(jsPattern, html);

fs.writeFileSync(origHTMLPath, html);
console.log('done');

console.log('deleting files...');
rimraf.sync(indexDest);
rimraf.sync(resDest);
console.log('done');

console.log('copying files...');

console.log(`${indexSource} -> ${indexDest}`);
ncp(indexSource, indexDest, (err) => {
    if(err) {
        console.error(err);
    }
    console.log('index copy done');
});

console.log(`${resSource} -> ${resDest}`);
ncp(resSource, resDest, (err) => {
    if(err) {
        console.error(err);
    }
    console.log('resource copy done');
});
