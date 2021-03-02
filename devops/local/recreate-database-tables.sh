#!/bin/bash -l
set -e

aws dynamodb create-table --cli-input-json file://channels-table-definition.json --endpoint-url http://localhost:8000
