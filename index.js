const GitHubClient = require("./services/githubClient");
const Util = require("./services/util");

const {
    NOTDELETELABEL
} = require('./config');

const RemovePulls = async () => {
    const pulls = await GitHubClient.GetOpenPulls();
    const folders = Util.GetPullNumbersOfExistingFolders(pulls);
    for (let folder of folders) {
        console.log(`start deleting ${folder}`);
        const pull = await GitHubClient.GetPull(folder);
        if (pull.status === 404) {
            console.log(`Pull ${folder} not found. Skipping pull.`);
            continue;
        }
        if (pull.labels.some(label => label === NOTDELETELABEL)) {
            console.log(`Pull ${pull.number} marked as Not delete. Skipping pull.`);
            continue;
        }
        Util.StartRemovingPull(folder);
    }
    Util.DockerNetworkPrune();
    Util.ReloadNginx();
}

RemovePulls();
