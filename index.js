require('dotenv').config()
const MongoClient = require('mongodb').MongoClient,
      co = require('co'),
      assert = require('assert'),
      visualize = require('./visualize');

const {
  WEBPACK_ASSET_ANALYZER_DB_HOST: DB_HOST,
  WEBPACK_ASSET_ANALYZER_DB_USER: DB_USER,
  WEBPACK_ASSET_ANALYZER_DB_PASSWORD: DB_PASSWORD,
  WEBPACK_ASSET_ANALYZER_DB_COLLECTION: DB_COLLECTION
} = process.env;

const WebpackAssetInfoPlotly = ({ date, time, assets }, options) => {

  const limit = (options && options.limit) ? options.limit : 10;

  co(function*() {
    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;
    const db = yield MongoClient.connect(url);
    const collection = db.collection(DB_COLLECTION);

    // Insert a single document
    const r = yield collection.insertOne({ date, time, assets });
    assert.equal(1, r.insertedCount);

    // Retrieve historical build data
    const cursor = collection.find().sort({ date: -1 }).limit(limit);
    const data = cursor.toArray((err, buildData) => {
      visualize(buildData);
    });
    db.close();
  }).catch(function(err) {
    console.log(err.stack);
  });
}

module.exports = WebpackAssetInfoPlotly;