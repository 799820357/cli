const path = require('path');
module.exports = projectInfo => {
    return {
        [projectInfo.name] : path.join(projectInfo.dirname, 'src', projectInfo.name, projectInfo.entryFile || 'index.js')
    };
};