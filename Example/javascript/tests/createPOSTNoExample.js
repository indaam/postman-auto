// Auto create at Sun Oct 30 2022 
const expect = require('chai').expect;
const http = require('https');

describe('Create POST No Example', function () {
  const httpPromise = function () {
    return new Promise((resolve, reject) => {
      /* const http = require('https') */
      const options = {
        method: 'POST',
        hostname: 'postman-echo.com',
        port: null,
        path: '/post',
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

      req.write(
        JSON.stringify({
          name: 'indaam',
          hobbies: [{ id: 0, name: 'coding' }],
          arr: [0, '1']
        })
      );
      req.end();
    });
  };
  it('Create POST No Example', function (done) {
    httpPromise()
      .then(function (res) {
        const jsonResponse = JSON.parse(res);
        /* SKIP TEST NO DATA */
        done();
      })
      .catch(console.log);
  });
});
