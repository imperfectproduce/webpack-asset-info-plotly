require('dotenv').config();
const fs = require('fs');
const filesize = require('file-size');
const { PLOTLY_USERNAME, PLOTLY_API_KEY } = process.env,
      plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_API_KEY);

const visualize = (data) => {
  // console.log('data: ', data);

  const dataToGraph = data.reduce((arr, build, i) => {
    const main = build.assets.find(e => e.name.includes('main'));
    const vendor = build.assets.find(e => e.name.includes('vendor'));

    const trace1 = Object.assign(arr[0], {
      x: arr[0].x.concat(i + 1),
      // x: arr[0].x.concat(build.date),
      y: arr[0].y.concat(filesize(vendor.size).to('MB'))
    });
    const trace2 = Object.assign(arr[1], {
      x: arr[1].x.concat(i + 1),
      // x: arr[1].x.concat(build.date),
      y: arr[1].y.concat(filesize(main.size).to('MB'))
    });
    const trace3 = Object.assign(arr[2], {
      x: arr[2].x.concat(i + 1),
      // x: arr[2].x.concat(build.date),
      y: arr[2].y.concat(filesize(build.assets.reduce((total, a) => total + a.size, 0)).to('MB'))
    })
    return [trace1, trace2, trace3];
  }, [
    { x: [], y: [], name: 'Vendor', type: 'bar', marker: { color: '#A1A9AF'} },
    { x: [], y: [], name: 'Main', type: 'bar', marker: { color: '#ADE3E5'} },
    { x: [], y: [], name: 'Total', type: 'bar', marker: { color: '#21BEC6'} }
  ]);

  // console.log('dataToGraph: ', dataToGraph);

  const graphOptions = {
    layout: {
      title: "Historical Build Sizes",
      barmode: "stack",
      yaxis: {
        title: "File Size (MB)"
      }
    },
    filename: "build-history",
    fileopt: "overwrite"
  };

  plotly.plot(dataToGraph, graphOptions, function (err, msg) {
      console.log('Graph of past builds: ', msg.url);
      // const image_id = msg.url.split('/').pop();
      // const image_format = 'png';
      // plotly.getFigure(PLOTLY_USERNAME, image_id, function (err, figure) {
      //   if (err) return console.log(err);
      //
      //   var imgOpts = {
      //     format: image_format,
      //     width: 1000,
      //     height: 500
      //   };
      //
      //   plotly.getImage(figure, imgOpts, function (error, imageStream) {
      //       if (error) return console.log (error);
      //
      //       const filename = `${image_id}.${image_format}`;
      //       var fileStream = fs.createWriteStream(filename);
      //       imageStream.pipe(fileStream);
      //       console.log('image created: ', filename);
      //   });
      // });
  });
};

module.exports = visualize;