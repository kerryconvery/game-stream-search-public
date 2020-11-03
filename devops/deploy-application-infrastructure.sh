
#!/bin/bash -l
set -e

readonly APPLICATION_NAME=stream-machine
readonly STACK_NAME=$APPLICATION_NAME-infrastructure
readonly FRONTEND_DEPLOY_BUCKET_NAME=app-$APPLICATION_NAME
readonly EB_SERVICE_ROLE_NAME=eb-role-stream-machine
readonly EB_DEPLOY_BUCKET_NAME=eb-stream-machine-deploy
readonly ECR_REPOSITORY_NAME=$APPLICATION_NAME

echo "Deploying aws infrastructure"
aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/application-infrastructure.yaml --parameter-overrides ApplicationName=$APPLICATION_NAME FrontendBucketName=$FRONTEND_DEPLOY_BUCKET_NAME EbDeploymentBucketName=$EB_DEPLOY_BUCKET_NAME ContainerRepositoryName=$ECR_REPOSITORY_NAME --capabilities CAPABILITY_NAMED_IAM