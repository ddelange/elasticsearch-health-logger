# Elasticsearch Health Logger

This is a small Node.js script to poll an Elasticsearch cluster and log the health (GREEN, YELLOW, or RED) of each index in the cluster.

The assumption is that the logs produced by this script will collected and used to generate alerts on undesirable statuses.

## Requirements

This package requires Node.js 8. It's strongly recommended to use the supplied Dockerfile to run the script.

## Configuration

The only configuration for this package is via environment variables. The following variables are supported:

`ELASTICSEARCH_HOST`: A string that represents the Elasticsearch host to query. For example: `http://elasticsearch:9200`. See the Elasticsearch-js [host documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/host-reference.html#_params) for all possible configurations.

`WATCH_INTERVAL`: The number of seconds between checks of the Elasticsearch cluster. Default is 60 seconds
