// Auto create at Sun Oct 30 2022 
const expect = require('chai').expect;
const http = require('https');

describe('Get User Name', function () {
  const httpPromise = function () {
    return new Promise((resolve, reject) => {
      /* const http = require('https') */
      const options = {
        method: 'GET',
        hostname: 'postman-echo.com',
        port: null,
        path: '/get?id=1&name=indaam',
        headers: {
          'x-forwarded-proto': 'https',
          'x-forwarded-port': '443',
          host: 'postman-echo.com',
          'x-amzn-trace-id': 'test_x-amzn-trace-id',
          'user-agent': 'PostmanRuntime/7.28.4',
          accept: '*/*',
          'postman-token': 'test_',
          'accept-encoding': 'gzip, deflate, br',
          cookie: 'c_test',
          'Content-Type': 'application/json'
        }
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
  it('Get User Name', function (done) {
    httpPromise()
      .then(function (res) {
        const jsonResponse = JSON.parse(res);
        /* Should ROOT must be an object and have keys 'args','headers','url'  */
        expect(jsonResponse).to.have.property('args');
        expect(jsonResponse).to.have.property('headers');
        expect(jsonResponse).to.have.property('url');

        /* Should args must be an object and have keys 'id','name'  */
        expect(jsonResponse.args).to.have.property('id');
        expect(jsonResponse.args).to.have.property('name');

        /* Should args.id to be String */
        expect(jsonResponse.args.id).to.be.a(
          'string',
          'Should args.id to be String'
        );

        /* Should args.name to be String */
        expect(jsonResponse.args.name).to.be.a(
          'string',
          'Should args.name to be String'
        );

        /* Should headers must be an object and have keys 'x-forwarded-proto','x-forwarded-port','host','x-amzn-trace-id','user-agent','accept','postman-token','accept-encoding','cookie','content-type'  */
        expect(jsonResponse.headers).to.have.property('x-forwarded-proto');
        expect(jsonResponse.headers).to.have.property('x-forwarded-port');
        expect(jsonResponse.headers).to.have.property('host');
        expect(jsonResponse.headers).to.have.property('x-amzn-trace-id');
        expect(jsonResponse.headers).to.have.property('user-agent');
        expect(jsonResponse.headers).to.have.property('accept');
        expect(jsonResponse.headers).to.have.property('postman-token');
        expect(jsonResponse.headers).to.have.property('accept-encoding');
        expect(jsonResponse.headers).to.have.property('cookie');
        expect(jsonResponse.headers).to.have.property('content-type');

        /* Should headers['x-forwarded-proto'] to be String */
        expect(jsonResponse.headers['x-forwarded-proto']).to.be.a(
          'string',
          "Should headers['x-forwarded-proto'] to be String"
        );

        /* Should headers['x-forwarded-port'] to be String */
        expect(jsonResponse.headers['x-forwarded-port']).to.be.a(
          'string',
          "Should headers['x-forwarded-port'] to be String"
        );

        /* Should headers.host to be String */
        expect(jsonResponse.headers.host).to.be.a(
          'string',
          'Should headers.host to be String'
        );

        /* Should headers['x-amzn-trace-id'] to be String */
        expect(jsonResponse.headers['x-amzn-trace-id']).to.be.a(
          'string',
          "Should headers['x-amzn-trace-id'] to be String"
        );

        /* Should headers['user-agent'] to be String */
        expect(jsonResponse.headers['user-agent']).to.be.a(
          'string',
          "Should headers['user-agent'] to be String"
        );

        /* Should headers.accept to be String */
        expect(jsonResponse.headers.accept).to.be.a(
          'string',
          'Should headers.accept to be String'
        );

        /* Should headers['postman-token'] to be String */
        expect(jsonResponse.headers['postman-token']).to.be.a(
          'string',
          "Should headers['postman-token'] to be String"
        );

        /* Should headers['accept-encoding'] to be String */
        expect(jsonResponse.headers['accept-encoding']).to.be.a(
          'string',
          "Should headers['accept-encoding'] to be String"
        );

        /* Should headers.cookie to be String */
        expect(jsonResponse.headers.cookie).to.be.a(
          'string',
          'Should headers.cookie to be String'
        );

        /* Should headers['content-type'] to be String */
        expect(jsonResponse.headers['content-type']).to.be.a(
          'string',
          "Should headers['content-type'] to be String"
        );

        /* Should url to be String */
        expect(jsonResponse.url).to.be.a('string', 'Should url to be String');
        done();
      })
      .catch(console.log);
  });
});
