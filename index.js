const elasticsearch = require('elasticsearch');

const watch_interval = process.env.WATCH_INTERVAL || 60;

const elasticsearch_host = process.env.ELASTICSEARCH_HOST;

if (!elasticsearch_host) {
  console.error("no ELASTICSEARCH_HOST set");
  process.exit(1);
}

const elasticsearch_client = new elasticsearch.Client({ host: elasticsearch_host });

async function checkElasticsearchIndices() {
  try {
    const indices = await elasticsearch_client.cat.indices({format: 'json'});

    // print one line of JSON for each index with vital statistics
    indices.forEach((index_info) => {
      const log_json = {
        index: index_info.index,   // index name
        health: index_info.health, // (red, yellow, green)
        status: index_info.status, // open, closed, etc
        shards: index_info.pri,    // primary shard count
        replicas: index_info.rep,   // number of replicas per primary shard

        // custom info passed in via environment vars
        environment: process.env.ENVIRONMENT
      };

      console.log(JSON.stringify(log_json));
    });
  } catch(error) {
    // treat all errors as fatal. Rely on container management to restart this after errors
    console.error(error);
    process.exit(1);
  }
}

// run once right at startup for easy debugging
checkElasticsearchIndices();

setInterval(checkElasticsearchIndices, watch_interval * 1000);
