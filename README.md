<h1 align=center>Animl Ingest API</h1>

Lambda function for ingesting camera trap images by API.

Other methods of importing images are:
- [Animl Email](https://github.com/tnc-ca-geo/animl-email-relay) - Ingest Images from Trail Cam Email Payloads
- [Animl Ingest](http://github.com/tnc-ca-geo/animl-ingest) - Inference ingested images with predefined workflows
- [Animl API](http://github.com/tnc-ca-geo/animl-api) - Manage images & initiate a batch image upload

## About

The animl-ingest-api stack is a collection of AWS resources managed by the
[Serverless framework](https://www.serverless.com/). When image payloads
are received they are passed through to the Anim Ingest S3 bucket,
managed by the [Animl Ingest](http://github.com/tnc-ca-geo/animl-ingest) stack.

The Animal ingest API aims to be compatible with as many camera trap providers
as possible and serve as an easier alternative to email relay configuration

## Setup

### Prerequisits

The instructions below assume you have the following tools globally installed:
- Serverless
- Docker
- aws-cli

### Create "animl" AWS config profile

The name of the profile must be "animl", because that's what
```serverles.yml``` will be looking for. Good instructions
[here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

### Make a project direcory and clone this repo

```sh
git clone https://github.com/tnc-ca-geo/animl-ingest-api.git
cd animl-ingest
npm install
```

## Dev deployment

From project root folder (where ```serverless.yml``` lives), run the following to deploy or update the stack:

```
# Deploy or update a development stack:
serverless deploy --stage dev

# Deploy or update a production stack:
serverless deploy --stage prod
```
