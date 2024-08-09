<h1 align=center>Animl Ingest API</h1>

Lambda-based API to support consuming cellular camera data via POST requests. Currently, the API only supports image payloads sent by Reconyx's servers.

## About

The animl-ingest-api stack is a collection of AWS resources managed by the [Serverless framework](https://www.serverless.com/). When image payloads are received they are passed through to the Animl Ingest S3 bucket, managed by the [Animl Ingest](http://github.com/tnc-ca-geo/animl-ingest) stack.

The Animal ingest API aims to be compatible with as many camera trap providers as possible and serve as an easier alternative to scraping image data out of email alerts, as we do in the [Animl Email Relay](https://github.com/tnc-ca-geo/animl-email-relay) service.

## Setup

### Prerequisites

The instructions below assume you have the following tools globally installed:

- Serverless
- Docker
- aws-cli

### Create "animl" AWS config profile

The name of the profile must be "animl", because that's what
`serverles.yml` will be looking for. Good instructions
[here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

### Make a project directory and clone this repo

```sh
git clone https://github.com/tnc-ca-geo/animl-ingest-api.git
cd animl-ingest-api/api
npm install
cd ..
```

## Dev deployment

From project root folder (where `serverless.yml` lives), run the following to deploy or update the stack:

```
# Deploy or update a development stack:
serverless deploy --stage dev

# Deploy or update a production stack:
serverless deploy --stage prod
```

## Related repos

Animl is comprised of a number of microservices, most of which are managed in their own repositories.

### Core services

Services necessary to run Animl:

- [Animl Ingest](http://github.com/tnc-ca-geo/animl-ingest)
- [Animl API](http://github.com/tnc-ca-geo/animl-api)
- [Animl Frontend](http://github.com/tnc-ca-geo/animl-frontend)
- [EXIF API](https://github.com/tnc-ca-geo/exif-api)

### Wireless camera services

Services related to ingesting and processing wireless camera trap data:

- [Animl Base](http://github.com/tnc-ca-geo/animl-base)
- [Animl Email Relay](https://github.com/tnc-ca-geo/animl-email-relay)
- [Animl Ingest API](https://github.com/tnc-ca-geo/animl-ingest-api)

### Misc. services

- [Animl ML](http://github.com/tnc-ca-geo/animl-ml)
- [Animl Analytics](http://github.com/tnc-ca-geo/animl-analytics)
