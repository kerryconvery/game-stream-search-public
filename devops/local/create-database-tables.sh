#!/bin/bash -l
set -e

aws dynamodb create-table \
   --table-name Channels \
   --attribute-definitions AttributeName=StreamPlatformName,AttributeType=S AttributeName=ChannelName,AttributeType=S \
   --key-schema AttributeName=StreamPlatformName,KeyType=HASH AttributeName=ChannelName,KeyType=RANGE \
   --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
   --endpoint-url http://localhost:8000