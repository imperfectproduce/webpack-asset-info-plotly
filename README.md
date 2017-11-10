# Work in Progress...

# webpack-asset-info-plotly
Visualize info from webpack stats after build via [Mongolab](https://mlab.com/) & [Plotly](https://plot.ly/).

For use with (https://github.com/relayfoods/webpack-asset-info).

---------

Should include an `.env` file in main webpack directory that looks like:

```
MONGO_DB_HOST=Your_mongolab_db_host
MONGO_DB_USER=Your_mongolab_db_host
MONGO_DB_PASSWORD=Your_mongolab_db_pw
MONGO_DB_COLLECTION=Your_mongolab_db_collection_name

PLOTLY_USERNAME=Your_plotly_username
PLOTLY_API_KEY=Your_plotly_api_key
```
