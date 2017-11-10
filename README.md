# Work in Progress...
- Expose settings as options
- do something with the exported Plotly URL / image!
- allow for self-hosted D3, instead of relying on Plotly?

# webpack-asset-info-plotly
Visualize info from webpack stats after build via [Mongolab](https://mlab.com/) & [Plotly](https://plot.ly/).

For use with (https://github.com/relayfoods/webpack-asset-info).

---------

## Prerequirements:

In order to make use of this plugin, you'll need access to a hosted MongoDB and a Plotly account.
Fortunately, trial versions of both can be found for free:

- [mLab](https://mlab.com/signup/) for MongoDB
- [Plotly](https://plot.ly/accounts/login/?action=signup)

---------

## Usage:

**This plugin requires [Webpack Asset Info](https://github.com/relayfoods/webpack-asset-info) plugin.**

In your `webpack.config.js` file:

```js
const WebpackAssetInfo = require('webpack-asset-info');
const WebpackAssetInfoPlotly = require('webpack-asset-info-plotly');

module.exports = {

  ... other stuff ...

  plugins: [
    new WebpackAssetInfo({
      statsOptions: null,
      matches: '*.min.js.gz',
      globOptions: {
        matchBase: true
      },
      callback: WebpackAssetInfoPlotly
    })
  ]
```

In addition, you should include a `.env` file in main webpack directory that looks like:

```
MONGO_DB_HOST=Your_mongolab_db_host
MONGO_DB_USER=Your_mongolab_db_host
MONGO_DB_PASSWORD=Your_mongolab_db_pw
MONGO_DB_COLLECTION=Your_mongolab_db_collection_name

PLOTLY_USERNAME=Your_plotly_username
PLOTLY_API_KEY=Your_plotly_api_key
```
