const fs = require('fs');
const { execSync } = require('child_process');

const {
    DEPLOYFOLDER,
    NGINXCONTAINERNAME,
    NGINXCONFIGFOLDER,
    PULLPREFIX,
    DEPLOYLABEL
} = require('../config');

module.exports = class Util {
    static GetDeployPullNumberFolders = () => {
        var files = fs.readdirSync(DEPLOYFOLDER, { withFileTypes: true }).filter(fn => fn.isDirectory() && fn.name.startsWith(PULLPREFIX));
        return files.map(str => str.name.replace(PULLPREFIX, "")).filter(Boolean);
    }

    static GetPullNumbersOfExistingFolders = (openPulls) => {
        const folders = this.GetDeployPullNumberFolders();
        return folders.filter(f => openPulls.some(pull => pull.number === +f && !pull.labels.includes(DEPLOYLABEL)) || !openPulls.some(i => i.number === +f));
    }

    static DownDockerCompose = (pullNumber) => {
        console.log(`docker compose ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber}/docker-compose.yml down -v`);
        execSync(`sudo docker-compose -f ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber}/docker-compose.yml down -v`, function (err, stdout, stderr) {
            if (err) {
                console.error(`docker compose ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber}/docker-compose.yml down error.`, err);
            }
        });
    }

    static DockerNetworkPrune = () => {
        console.log(`docker network prune`);
        execSync(`sudo docker network prune`, function (err, stdout, stderr) {
            if (err) {
                console.error(`docker network prune error.`, err);
            }
        });
    }

    static RemoveFolder = (pullNumber) => {
        console.log(`delete folder ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber}`);
        execSync(`sudo rm -r ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber}`, function (err, stdout, stderr) {
            if (err) {
                console.error(`folder ${DEPLOYFOLDER}/${PULLPREFIX}${pullNumber} not deleted.`, err);
            }
        });
    }

    static RemoveNginxConf = (pullNumber) => {
        console.log(`delete nginx confing ${NGINXCONFIGFOLDER}/${PULLPREFIX}${pullNumber}.conf`);
        execSync(`sudo rm ${NGINXCONFIGFOLDER}/${PULLPREFIX}${pullNumber}.conf`, function (err, stdout, stderr) {
            if (err) {
                console.error(`nginx confing ${NGINXCONFIGFOLDER}/${PULLPREFIX}${pullNumber}.conf deleted error.`, err);
            }
        });
    }

    static ReloadNginx = () => {
        console.log(`reload nginx`);
        execSync(`sudo docker exec ${NGINXCONTAINERNAME} nginx -s reload`, function (err, stdout, stderr) {
            if (err) {
                console.error(`reload nginx error.`, err);
            }
        });
    }

    static StartRemovingPull = (pullNumber) => {
        this.RemoveNginxConf(pullNumber);
        this.DownDockerCompose(pullNumber);
        this.RemoveFolder(pullNumber);
    }
}
