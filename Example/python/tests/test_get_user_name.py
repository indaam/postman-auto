# Auto create at Sun Oct 30 2022 
import http.client
import json
import unittest

try:
    #python2
    from BaseTest import BaseTest
except ImportError:
    #python3
    from .BaseTest import BaseTest

class GetUserName(BaseTest):

  # Get User Name
  def test_get_user_name(self):
    
    conn = http.client.HTTPSConnection("postman-echo.com")
    
    headers = {
        'x-forwarded-proto': "https",
        'x-forwarded-port': "443",
        'host': "postman-echo.com",
        'x-amzn-trace-id': "test_x-amzn-trace-id",
        'user-agent': "PostmanRuntime/7.28.4",
        'accept': "*/*",
        'postman-token': "test_",
        'accept-encoding': "gzip, deflate, br",
        'cookie': "c_test",
        'Content-Type': "application/json"
        }
    
    conn.request("GET", "/get?id=1&name=indaam", headers=headers)
    
    res = conn.getresponse()
    data = res.read()
    
    # print(data.decode("utf-8"))
    conn.close()
    resp_json = json.loads(data.decode("utf-8"))

    # Should ['ROOT'] must be an object and have keys 'args','headers','url' 
    self.assertEqual(self.have_property(resp_json, 'args'), True, "Should ['ROOT'] must be an object and have key 'args' ")
    self.assertEqual(self.have_property(resp_json, 'headers'), True, "Should ['ROOT'] must be an object and have key 'headers' ")
    self.assertEqual(self.have_property(resp_json, 'url'), True, "Should ['ROOT'] must be an object and have key 'url' ")

    # Should ['args'] must be an object and have keys 'id','name' 
    self.assertEqual(self.have_property(resp_json['args'], 'id'), True, "Should ['args'] must be an object and have key 'id' ")
    self.assertEqual(self.have_property(resp_json['args'], 'name'), True, "Should ['args'] must be an object and have key 'name' ")

    # Should ['args']['id'] to be String
    self.assertEqual(self.is_string(resp_json['args']['id']), True, "Should ['args']['id'] to be String")

    # Should ['args']['name'] to be String
    self.assertEqual(self.is_string(resp_json['args']['name']), True, "Should ['args']['name'] to be String")

    # Should ['headers'] must be an object and have keys 'x-forwarded-proto','x-forwarded-port','host','x-amzn-trace-id','user-agent','accept','postman-token','accept-encoding','cookie','content-type' 
    self.assertEqual(self.have_property(resp_json['headers'], 'x-forwarded-proto'), True, "Should ['headers'] must be an object and have key 'x-forwarded-proto' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'x-forwarded-port'), True, "Should ['headers'] must be an object and have key 'x-forwarded-port' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'host'), True, "Should ['headers'] must be an object and have key 'host' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'x-amzn-trace-id'), True, "Should ['headers'] must be an object and have key 'x-amzn-trace-id' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'user-agent'), True, "Should ['headers'] must be an object and have key 'user-agent' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'accept'), True, "Should ['headers'] must be an object and have key 'accept' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'postman-token'), True, "Should ['headers'] must be an object and have key 'postman-token' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'accept-encoding'), True, "Should ['headers'] must be an object and have key 'accept-encoding' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'cookie'), True, "Should ['headers'] must be an object and have key 'cookie' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'content-type'), True, "Should ['headers'] must be an object and have key 'content-type' ")

    # Should ['headers']['x-forwarded-proto'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['x-forwarded-proto']), True, "Should ['headers']['x-forwarded-proto'] to be String")

    # Should ['headers']['x-forwarded-port'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['x-forwarded-port']), True, "Should ['headers']['x-forwarded-port'] to be String")

    # Should ['headers']['host'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['host']), True, "Should ['headers']['host'] to be String")

    # Should ['headers']['x-amzn-trace-id'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['x-amzn-trace-id']), True, "Should ['headers']['x-amzn-trace-id'] to be String")

    # Should ['headers']['user-agent'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['user-agent']), True, "Should ['headers']['user-agent'] to be String")

    # Should ['headers']['accept'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['accept']), True, "Should ['headers']['accept'] to be String")

    # Should ['headers']['postman-token'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['postman-token']), True, "Should ['headers']['postman-token'] to be String")

    # Should ['headers']['accept-encoding'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['accept-encoding']), True, "Should ['headers']['accept-encoding'] to be String")

    # Should ['headers']['cookie'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['cookie']), True, "Should ['headers']['cookie'] to be String")

    # Should ['headers']['content-type'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['content-type']), True, "Should ['headers']['content-type'] to be String")

    # Should ['url'] to be String
    self.assertEqual(self.is_string(resp_json['url']), True, "Should ['url'] to be String")

