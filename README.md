# Game stream search


### Requirements to run
* Docker v2

### Requirements to develop
* Lerna v3.22+ `npm install --global lerna`
* NodeJs v14+
* Npm 6.14+

### Commands
* `lerna bootstrap` - Install all dependencies
* `lerna run build` - Build all components
* `lerna run start:service --stream` - Builds and starts the backend service including database inside a docker container
* `lerna run stop:service --stream` - Stops the running service
* `lerna run test --stream` - run all unit tests
* `lerna run test:integration --stream` - run the integration tests (web service must be running first)

### How to run the application
1. Clone to repository to your local machine
2. Change the to folder into which the repository was cloned.
4. Run the application `docker-compose up`
5. Navigate your browser to http://localhost:8080
6. Stop the application `docker-compose down`

### How to develop the application
1. Clone to repository to your local machine
2. Change the to folder into which the repository was cloned.
3. Install all dependencies `lerna bootstrap`
4. Start the web service and web server `lerna run start:service --stream`
5. Start the web client `lerna run start:web-client`
5. Navigate your browser to http://localhost:8080
6. Stop the web service `lerna run stop:service`

### Deploy AWS infrastructure needed to support the application
1. Change to the folder /devops
2. Ensure the infrastructure is deployed by running ```deploy-application-infrastructure-preprod.sh```

### Deploy application to AWS
1. Change to the folder /devops
2. Deploy the application by running ```deploy-application-components-preprod.sh``` and pass a number number as the first parameter

### Improvements
#### Application improvements
* Filter by langauge
* Provide a way to support new streamers

#### Technical improvements
* Setup a CICD build pipeline and have it hosted on the a cloud platform
* Store API keys in a secure location such as AWS Parameter store or secrets manager
* Add a API rate limiter
* Service monitoring
* Error logging frontend and backend
* Use a linter
* E2E UI Tests
