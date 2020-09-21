const program = require('commander');
const pkg = require('./package.json');
const createReact = require('./command/create-react');
//program
program.version(pkg.version,'-v, --vers', 'output the current version');
createReact(program);
program.parse(process.argv);

