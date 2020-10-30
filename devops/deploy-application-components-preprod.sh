
#!/bin/bash -l
set -e

readonly STACK_NAME=stream-machine-application-service-preprod
readonly AWS_REGION=ap-southeast-2
readonly APPLICATION_NAME=stream machine
readonly APPLICATION_DESCRIPTION=the stream machine backend service
readonly EB_SERVICE_ROLE_NAME=eb-role-stream-machine-preprod
readonly EB_DEPLOY_BUCKET_NAME=eb-stream-machine-deploy-preprod
readonly EB_DEPLOY_BUCKET_KEY=test
readonly EB_SECURITY_GROUP_NAME=eb-sg-security-group-preprod

aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/elastic-beanstalk-environment.yaml --parameter-overrides ApplicationName=$APPLICATION_NAME ApplicationDescription=$APPLICATION_DESCRIPTION DeploymentBucketName=$EB_DEPLOY_BUCKET_NAME DeploymentBucketKey=$EB_DEPLOY_BUCKET_KEY ServiceRoleName=$EB_SERVICE_ROLE_NAME SecurityGroupName=$EB_SECURITY_GROUP_NAME --region $AWS_REGION "$@"