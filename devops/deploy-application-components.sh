
#!/bin/bash -l
set -e

readonly ECR_REPOSIOTRY_URL=834285024888.dkr.ecr.ap-southeast-2.amazonaws.com
readonly ECR_REPOSIOTRY_NAME=stream-machine

readonly APPLICATION_NAME=stream-machine
readonly STACK_NAME=$APPLICATION_NAME-service-$1
readonly EB_APPLICATION_NAME=$APPLICATION_NAME-$1
readonly FRONTEND_DEPLOY_BUCKET_NAME=app-$APPLICATION_NAME
readonly EB_ENVIRONMENT_CNAME_PREFIX=$1-$APPLICATION_NAME
readonly EB_DEPLOY_BUCKET_NAME=eb-$APPLICATION_NAME-deploy

readonly EB_DEPLOYMENT_PACKAGE=eb-$APPLICATION_NAME-deploy-$2.zip

echo "Build and tag the service image"
docker build -t $ECR_REPOSIOTRY_URL/$ECR_REPOSIOTRY_NAME:$2 ../game-stream-search-service/.

echo "Log docker into ECR"
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REPOSIOTRY_URL

echo "Push the service image to ECR"
docker push $ECR_REPOSIOTRY_URL/$ECR_REPOSIOTRY_NAME:$2

echo "Generating Docker run file"
sed -e "s/IMAGE/$ECR_REPOSIOTRY_URL\/$ECR_REPOSIOTRY_NAME:$2/g" Dockerrun.aws.json.template > Dockerrun.aws.json

echo "Creating elastic beanstalk deployment package"
zip $EB_DEPLOYMENT_PACKAGE Dockerrun.aws.json

echo "Uploading docker run file $EB_DEPLOYMENT_PACKAGE to $EB_DEPLOY_BUCKET_NAME key $EB_DEPLOYMENT_PACKAGE"
aws s3api put-object --bucket $EB_DEPLOY_BUCKET_NAME --key $EB_DEPLOYMENT_PACKAGE --body $EB_DEPLOYMENT_PACKAGE >/dev/null

echo "Deploy elastic beanstalk infrastructure"
aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/elastic-beanstalk-environment.yaml --parameter-overrides ApplicationName=$EB_APPLICATION_NAME EnvironmentCNAMEPrefix=$EB_ENVIRONMENT_CNAME_PREFIX DeploymentBucketKey=$EB_DEPLOYMENT_PACKAGE --capabilities CAPABILITY_NAMED_IAM

echo "Building frontend bundle"
npm run build:preprod --prefix ../game-stream-search-web

echo "Deploy frontend static files"
aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.html --body ../game-stream-search-web/dist/index.html --cache-control "public" --content-type "text/html; charset=utf-8" >/dev/null
aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.js --body ../game-stream-search-web/dist/index.js --cache-control "public" --content-type "application/javascript" >/dev/null

echo "Deployment completed"
 