// Auto create at Sun Oct 30 2022 
const expect = require('chai').expect;
const http = require('https');

describe('Get User Name No Example', function () {
  const httpPromise = function () {
    return new Promise((resolve, reject) => {
      /* const http = require('https') */
      const options = {
        method: 'GET',
        hostname: 'postman-echo.com',
        port: null,
        path: '/get?id=1&name=indaam',
        headers: {}
      };

      const req = http.request(options, function (res) {
        const chunks = [];

        res.on('data', function (chunk) {
          chunks.push(chunk);
        });

        res.on('end', function () {
          const body = Buffer.concat(chunks);
          resolve(body.toString());
        });
      });

      req.end();
    });
  };
  it('Get User Name No Example', function (done) {
    httpPromise()
      .then(function (res) {
        const jsonResponse = JSON.parse(res);
        /* SKIP TEST NO DATA */
        done();
      })
      .catch(console.log);
  });
});
