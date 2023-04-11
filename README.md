# PullsRemoverService
Service for automatically deleting closed application instances in a Linux environment using Node.js.

## Installation and Usage
1. Clone the repository:
``` bash
git clone https://github.com/deimosowen/PullsRemoverService.git
```
2. Navigate to the project directory:
``` bash
cd PullsRemoverService
```
3. Install dependencies:
``` bash
npm install
```
4. Set environment variables using one of the following methods:
* Create a `.env` file and add the following variables with the appropriate values:
``` makefile
GETHUBTOKEN=your_github_token
REPOSITORY=your_repository
OWNER=your_username
DEPLOYLABEL=deploy
NOTDELETELABEL=do_not_delete
DEPLOYFOLDER=deploy_folder
PULLPREFIX=pull
NGINXCONTAINERNAME=nginx_container_name
NGINXCONFIGFOLDER=nginx_config_folder
```
* Or set environment variables directly before running the service:
``` makefile
export GETHUBTOKEN=your_github_token
export REPOSITORY=your_repository
export OWNER=your_username
export DEPLOYLABEL=deploy
export NOTDELETELABEL=do_not_delete
export DEPLOYFOLDER=deploy_folder
export PULLPREFIX=pull
export NGINXCONTAINERNAME=nginx_container_name
export NGINXCONFIGFOLDER=nginx_config_folder
```
5. Start the service:
``` bash
npm start
```
**Note**: Environment variables can be set either using the `.env` file or directly via the `export` command. Choose the method that is most convenient for you.

## Configuration
The following configuration variables are used in the project:

* `GETHUBTOKEN`: Your GitHub token for API access.
* `REPOSITORY`: The repository name that the service works with.
* `OWNER`: The username or organization that owns the repository.
* `DEPLOYLABEL`: The label used to mark deployed applications.
* `NOTDELETELABEL`: The label used to mark applications that should not be deleted.
* `DEPLOYFOLDER`: The folder for deploying applications.
* `PULLPREFIX`: The prefix used for naming folders during deployment.
* `NGINXCONTAINERNAME`: The Nginx container name.
* `NGINXCONFIGFOLDER`: The path to the Nginx configuration files folder.
All variables are loaded from the `.env` file or set directly via the `export` command and are available through the `process.env` object.
