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

### Improvements
#### Application improvements
* For security, secure the backend with OAuth and require the user to login before they can view client information
* Store client information encrypted at rest
* Use SSL between frontend and backend
* Generate a human friendly client/patient number which is displayed on the frontend
* Capture additional information about the client/patient such as:
  - Middle name
  - Email address
  - Date of birth
  - Physical Address
  - Current GP
  - Next of kin
  - Emergency contact
  - Date they joined
  - Notes
  - Auditing information
* Support search by name, client/patient number, email address, phone number 
* Improve the user experience with input masks (for phone number, email address, etc) and improved validation
* Ability to edit and delete an existing client/patient record
* Frontend error handling

#### Technical improvements
* Setup a CICD build pipeline and have it hosted on the a cloud platform
* Store secrets in a secure location such as AWS Parameter store or secrets manager
* Service monitoring
* Error logging frontend and backend
* Use a linter
* E2E UI Tests
