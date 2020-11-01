
#!/bin/bash -l
set -e

readonly ECR_REPOSIOTRY_URL=834285024888.dkr.ecr.ap-southeast-2.amazonaws.com
readonly ECR_REPOSIOTRY_NAME=eb-ecr-stream-machine-preprod

readonly STACK_NAME=stream-machine-application-service-preprod
readonly APPLICATION_NAME=stream-machine
readonly APPLICATION_DESCRIPTION=the stream machine backend service
readonly FRONTEND_DEPLOY_BUCKET_NAME=app-stream-machine-preprod
readonly EB_ENVIRONMENT_CNAME_PREFIX=preprod-stream-machine
readonly EB_SERVICE_ROLE_NAME=eb-role-stream-machine-preprod
readonly EB_DEPLOY_BUCKET_NAME=eb-stream-machine-deploy-preprod
readonly EB_SECURITY_GROUP_NAME=eb-sg-security-group-preprod

readonly EB_DEPLOYMENT_PACKAGE=eb-$APPLICATION_NAME-deploy-$1.zip

echo "Build and tag the service image"
docker build -t $ECR_REPOSIOTRY_URL/$ECR_REPOSIOTRY_NAME:$1 ../game-stream-search-service/.

echo "Log docker into ECR"
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REPOSIOTRY_URL

echo "Push the service image to ECR"
docker push $ECR_REPOSIOTRY_URL/$ECR_REPOSIOTRY_NAME:$1 

echo "Generating Docker run file"
sed -e "s/IMAGE/$ECR_REPOSIOTRY_URL\/$ECR_REPOSIOTRY_NAME:$1/g" Dockerrun.aws.json.template > Dockerrun.aws.json

echo "Creating elastic beanstalk deployment package"
zip $EB_DEPLOYMENT_PACKAGE Dockerrun.aws.json

echo "Uploading docker run file"
aws s3api put-object --bucket $EB_DEPLOY_BUCKET_NAME --key $EB_DEPLOYMENT_PACKAGE --body $EB_DEPLOYMENT_PACKAGE >/dev/null

echo "Deploy elastic beanstalk infrastructure"
aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/elastic-beanstalk-environment.yaml --parameter-overrides ApplicationName=$APPLICATION_NAME ApplicationDescription=$APPLICATION_DESCRIPTION EnvironmentCNAMEPrefix=$EB_ENVIRONMENT_CNAME_PREFIX DeploymentBucketName=$EB_DEPLOY_BUCKET_NAME DeploymentBucketKey=$EB_DEPLOYMENT_PACKAGE ServiceRoleName=$EB_SERVICE_ROLE_NAME SecurityGroupName=$EB_SECURITY_GROUP_NAME --capabilities CAPABILITY_NAMED_IAM

echo "Building frontend bundle"
npm run build:preprod --prefix ../game-stream-search-web

echo "Deploy frontend static files"
aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.html --body ../game-stream-search-web/dist/index.html --cache-control "public" --content-type "text/html; charset=utf-8" >/dev/null
aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.js --body ../game-stream-search-web/dist/index.js --cache-control "public" --content-type "application/javascript" >/dev/null

echo "Deployment completed"
 