
#!/bin/bash -l
set -e

readonly STACK_NAME=stream-machine-application-service-preprod
readonly AWS_REGION=ap-southeast-2
readonly APPLICATION_NAME=stream-machine
readonly APPLICATION_DESCRIPTION=the stream machine backend service
readonly FRONTEND_DEPLOY_BUCKET_NAME=app-stream-machine-preprod
readonly EB_SERVICE_ROLE_NAME=eb-role-stream-machine-preprod
readonly EB_DEPLOY_BUCKET_NAME=eb-stream-machine-deploy-preprod
readonly EB_DEPLOY_BUCKET_KEY=eb-ecr-stream-machine-preprod.zip
readonly EB_SECURITY_GROUP_NAME=eb-sg-security-group-preprod

aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/elastic-beanstalk-environment.yaml --parameter-overrides ApplicationName=$APPLICATION_NAME ApplicationDescription=$APPLICATION_DESCRIPTION DeploymentBucketName=$EB_DEPLOY_BUCKET_NAME DeploymentBucketKey=$EB_DEPLOY_BUCKET_KEY ServiceRoleName=$EB_SERVICE_ROLE_NAME SecurityGroupName=$EB_SECURITY_GROUP_NAME --capabilities CAPABILITY_NAMED_IAM --region $AWS_REGION "$@"

aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.html --body ../game-stream-search-web/dist/index.html --cache-control "public" --content-type "text/html; charset=utf-8" "$@"
aws s3api put-object --bucket $FRONTEND_DEPLOY_BUCKET_NAME --key index.js --body ../game-stream-search-web/dist/index.js --cache-control "public" --content-type "application/javascript" "$@"
