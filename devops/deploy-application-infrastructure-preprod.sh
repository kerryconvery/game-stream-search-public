
#!/bin/bash -l
set -e

readonly STACK_NAME=stream-machine-infrastructure-preprod
readonly AWS_REGION=ap-southeast-2
readonly FRONTEND_DEPLOY_BUCKET_NAME=app-stream-machine-preprod
readonly EB_SERVICE_ROLE_NAME=eb-role-stream-machine-preprod
readonly EB_DEPLOY_BUCKET_NAME=eb-stream-machine-deploy-preprod
readonly EB_SECURITY_GROUP_NAME=eb-sg-security-group-preprod
readonly EB_CONTAINER_REPOSITORY_NAME=eb-ecr-stream-machine-preprod
readonly DEPLOY_USER=kerry-convery

aws cloudformation deploy --stack-name $STACK_NAME --template-file ./cloudformation-templates/application-infrastructure.yaml --parameter-overrides FrontendBucketName=$FRONTEND_DEPLOY_BUCKET_NAME EbDeploymentBucketName=$EB_DEPLOY_BUCKET_NAME EbServiceRoleName=$EB_SERVICE_ROLE_NAME EbSecurityGroupName=$EB_SECURITY_GROUP_NAME EbContainerRepositoryName=$EB_CONTAINER_REPOSITORY_NAME DeployUser=$DEPLOY_USER --region $AWS_REGION --capabilities CAPABILITY_NAMED_IAM "$@"