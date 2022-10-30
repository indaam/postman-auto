// Auto create at Sun Oct 30 2022 
const expect = require('chai').expect;
const http = require('https');

describe('Create POST', function () {
  const httpPromise = function () {
    return new Promise((resolve, reject) => {
      /* const http = require('https') */
      const options = {
        method: 'POST',
        hostname: 'postman-echo.com',
        port: null,
        path: '/post',
        headers: {
          'user-agent': 'test_user-agent',
          'x-amzn-trace-id': '4a56558313e824fc4a2b3a1a',
          'x-forwarded-proto': 'test_x-forwarded-proto',
          'x-forwarded-port': '443',
          host: 'postman-echo.com',
          accept: '*/*',
          'postman-token': 'pm_postman-token',
          'accept-encoding': 'gzip, deflate, br',
          cookie: 'test_cookie',
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

      req.write(
        JSON.stringify({
          name: 'indaam',
          hobbies: [{ id: 0, name: 'anything' }],
          arr: [0, '1'],
          _null: null,
          _boolean: true
        })
      );
      req.end();
    });
  };
  it('Create POST', function (done) {
    httpPromise()
      .then(function (res) {
        const jsonResponse = JSON.parse(res);
        /* Should ROOT must be an object and have keys 'args','data','files','form','headers','json','url'  */
        expect(jsonResponse).to.have.property('args');
        expect(jsonResponse).to.have.property('data');
        expect(jsonResponse).to.have.property('files');
        expect(jsonResponse).to.have.property('form');
        expect(jsonResponse).to.have.property('headers');
        expect(jsonResponse).to.have.property('json');
        expect(jsonResponse).to.have.property('url');

        /* Should args must be an object   */
        expect(jsonResponse.args).to.be.an(
          'object',
          'Should args must be an object  '
        );

        /* Should data must be an object and have keys 'name','hobbies','arr','_null','_boolean'  */
        expect(jsonResponse.data).to.have.property('name');
        expect(jsonResponse.data).to.have.property('hobbies');
        expect(jsonResponse.data).to.have.property('arr');
        expect(jsonResponse.data).to.have.property('_null');
        expect(jsonResponse.data).to.have.property('_boolean');

        /* Should data.name to be String */
        expect(jsonResponse.data.name).to.be.a(
          'string',
          'Should data.name to be String'
        );

        /* Should data.hobbies to be an Array */
        expect(jsonResponse.data.hobbies).to.be.a(
          'array',
          'Should data.hobbies to be an Array'
        );

        /* Should data.hobbies[0].id to be Number */
        expect(jsonResponse.data.hobbies[0].id).to.be.a(
          'number',
          'Should data.hobbies[0].id to be Number'
        );

        /* Should data.hobbies[0].name to be String */
        expect(jsonResponse.data.hobbies[0].name).to.be.a(
          'string',
          'Should data.hobbies[0].name to be String'
        );

        /* Should data.arr to be an Array */
        expect(jsonResponse.data.arr).to.be.a(
          'array',
          'Should data.arr to be an Array'
        );

        /* Should data.arr[0] to be Number */
        expect(jsonResponse.data.arr[0]).to.be.a(
          'number',
          'Should data.arr[0] to be Number'
        );

        /* Should data._null to be Null */
        /* Skip test data._null because value is Null */

        /* Should data._boolean to be a Boolean */
        expect(jsonResponse.data._boolean).to.be.a(
          'boolean',
          'Should data._boolean to be a Boolean'
        );

        /* Should files must be an object   */
        expect(jsonResponse.files).to.be.an(
          'object',
          'Should files must be an object  '
        );

        /* Should form must be an object   */
        expect(jsonResponse.form).to.be.an(
          'object',
          'Should form must be an object  '
        );

        /* Should headers must be an object and have keys 'x-forwarded-proto','x-forwarded-port','host','x-amzn-trace-id','content-length','user-agent','accept','postman-token','accept-encoding','cookie','content-type'  */
        expect(jsonResponse.headers).to.have.property('x-forwarded-proto');
        expect(jsonResponse.headers).to.have.property('x-forwarded-port');
        expect(jsonResponse.headers).to.have.property('host');
        expect(jsonResponse.headers).to.have.property('x-amzn-trace-id');
        expect(jsonResponse.headers).to.have.property('content-length');
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

        /* Should headers['content-length'] to be String */
        expect(jsonResponse.headers['content-length']).to.be.a(
          'string',
          "Should headers['content-length'] to be String"
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

        /* Should json must be an object and have keys 'name','hobbies','arr','_null','_boolean'  */
        expect(jsonResponse.json).to.have.property('name');
        expect(jsonResponse.json).to.have.property('hobbies');
        expect(jsonResponse.json).to.have.property('arr');
        expect(jsonResponse.json).to.have.property('_null');
        expect(jsonResponse.json).to.have.property('_boolean');

        /* Should json.name to be String */
        expect(jsonResponse.json.name).to.be.a(
          'string',
          'Should json.name to be String'
        );

        /* Should json.hobbies to be an Array */
        expect(jsonResponse.json.hobbies).to.be.a(
          'array',
          'Should json.hobbies to be an Array'
        );

        /* Should json.hobbies[0].id to be Number */
        expect(jsonResponse.json.hobbies[0].id).to.be.a(
          'number',
          'Should json.hobbies[0].id to be Number'
        );

        /* Should json.hobbies[0].name to be String */
        expect(jsonResponse.json.hobbies[0].name).to.be.a(
          'string',
          'Should json.hobbies[0].name to be String'
        );

        /* Should json.arr to be an Array */
        expect(jsonResponse.json.arr).to.be.a(
          'array',
          'Should json.arr to be an Array'
        );

        /* Should json.arr[0] to be Number */
        expect(jsonResponse.json.arr[0]).to.be.a(
          'number',
          'Should json.arr[0] to be Number'
        );

        /* Should json._null to be Null */
        /* Skip test json._null because value is Null */

        /* Should json._boolean to be a Boolean */
        expect(jsonResponse.json._boolean).to.be.a(
          'boolean',
          'Should json._boolean to be a Boolean'
        );

        /* Should url to be String */
        expect(jsonResponse.url).to.be.a('string', 'Should url to be String');
        done();
      })
      .catch(console.log);
  });
});
