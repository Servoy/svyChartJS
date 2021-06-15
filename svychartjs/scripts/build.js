var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/svychartjs/", "/dist/servoy/svychartjs/");
zip.addLocalFolder("./chart/", "/chart/");
zip.addLocalFolder("./lib/", "/lib/");

zip.writeZip("svychartjs.zip");