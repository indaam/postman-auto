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

class CreatePost(BaseTest):

  # Create POST
  def test_create_post(self):
    
    conn = http.client.HTTPSConnection("postman-echo.com")
    
    payload = "{\n    \"name\": \"indaam\",\n    \"hobbies\": [{\n        \"id\" : 0,\n        \"name\" : \"anything\"\n    }],\n    \"arr\" : [0, \"1\"],\n    \"_null\" : null,\n    \"_boolean\" : true\n}"
    
    headers = {
        'user-agent': "test_user-agent",
        'x-amzn-trace-id': "4a56558313e824fc4a2b3a1a",
        'x-forwarded-proto': "test_x-forwarded-proto",
        'x-forwarded-port': "443",
        'host': "postman-echo.com",
        'accept': "*/*",
        'postman-token': "pm_postman-token",
        'accept-encoding': "gzip, deflate, br",
        'cookie': "test_cookie",
        'Content-Type': "application/json"
        }
    
    conn.request("POST", "/post", payload, headers)
    
    res = conn.getresponse()
    data = res.read()
    
    # print(data.decode("utf-8"))
    conn.close()
    resp_json = json.loads(data.decode("utf-8"))

    # Should ['ROOT'] must be an object and have keys 'args','data','files','form','headers','json','url' 
    self.assertEqual(self.have_property(resp_json, 'args'), True, "Should ['ROOT'] must be an object and have key 'args' ")
    self.assertEqual(self.have_property(resp_json, 'data'), True, "Should ['ROOT'] must be an object and have key 'data' ")
    self.assertEqual(self.have_property(resp_json, 'files'), True, "Should ['ROOT'] must be an object and have key 'files' ")
    self.assertEqual(self.have_property(resp_json, 'form'), True, "Should ['ROOT'] must be an object and have key 'form' ")
    self.assertEqual(self.have_property(resp_json, 'headers'), True, "Should ['ROOT'] must be an object and have key 'headers' ")
    self.assertEqual(self.have_property(resp_json, 'json'), True, "Should ['ROOT'] must be an object and have key 'json' ")
    self.assertEqual(self.have_property(resp_json, 'url'), True, "Should ['ROOT'] must be an object and have key 'url' ")

    # Should ['args'] must be an object  
    self.assertEqual(self.is_object(resp_json['args']), True, "Should ['args'] must be an object  ")

    # Should ['data'] must be an object and have keys 'name','hobbies','arr','_null','_boolean' 
    self.assertEqual(self.have_property(resp_json['data'], 'name'), True, "Should ['data'] must be an object and have key 'name' ")
    self.assertEqual(self.have_property(resp_json['data'], 'hobbies'), True, "Should ['data'] must be an object and have key 'hobbies' ")
    self.assertEqual(self.have_property(resp_json['data'], 'arr'), True, "Should ['data'] must be an object and have key 'arr' ")
    self.assertEqual(self.have_property(resp_json['data'], '_null'), True, "Should ['data'] must be an object and have key '_null' ")
    self.assertEqual(self.have_property(resp_json['data'], '_boolean'), True, "Should ['data'] must be an object and have key '_boolean' ")

    # Should ['data']['name'] to be String
    self.assertEqual(self.is_string(resp_json['data']['name']), True, "Should ['data']['name'] to be String")

    # Should ['data']['hobbies'] to be an Array
    self.assertEqual(self.is_array(resp_json['data']['hobbies']), True, "Should ['data']['hobbies'] to be an Array")

    # Should ['data']['hobbies'][0]['id'] to be Number
    self.assertEqual(self.is_number(resp_json['data']['hobbies'][0]['id']), True, "Should ['data']['hobbies'][0]['id'] to be Number")

    # Should ['data']['hobbies'][0]['name'] to be String
    self.assertEqual(self.is_string(resp_json['data']['hobbies'][0]['name']), True, "Should ['data']['hobbies'][0]['name'] to be String")

    # Should ['data']['arr'] to be an Array
    self.assertEqual(self.is_array(resp_json['data']['arr']), True, "Should ['data']['arr'] to be an Array")

    # Should ['data']['arr'][0] to be Number
    self.assertEqual(self.is_number(resp_json['data']['arr'][0]), True, "Should ['data']['arr'][0] to be Number")

    # Should ['data']['_null'] to be Null
    # Skip test ['data']['_null'] because value is Null

    # Should ['data']['_boolean'] to be a Boolean
    self.assertEqual(self.is_bool(resp_json['data']['_boolean']), True, "Should ['data']['_boolean'] to be a Boolean")

    # Should ['files'] must be an object  
    self.assertEqual(self.is_object(resp_json['files']), True, "Should ['files'] must be an object  ")

    # Should ['form'] must be an object  
    self.assertEqual(self.is_object(resp_json['form']), True, "Should ['form'] must be an object  ")

    # Should ['headers'] must be an object and have keys 'x-forwarded-proto','x-forwarded-port','host','x-amzn-trace-id','content-length','user-agent','accept','postman-token','accept-encoding','cookie','content-type' 
    self.assertEqual(self.have_property(resp_json['headers'], 'x-forwarded-proto'), True, "Should ['headers'] must be an object and have key 'x-forwarded-proto' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'x-forwarded-port'), True, "Should ['headers'] must be an object and have key 'x-forwarded-port' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'host'), True, "Should ['headers'] must be an object and have key 'host' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'x-amzn-trace-id'), True, "Should ['headers'] must be an object and have key 'x-amzn-trace-id' ")
    self.assertEqual(self.have_property(resp_json['headers'], 'content-length'), True, "Should ['headers'] must be an object and have key 'content-length' ")
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

    # Should ['headers']['content-length'] to be String
    self.assertEqual(self.is_string(resp_json['headers']['content-length']), True, "Should ['headers']['content-length'] to be String")

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

    # Should ['json'] must be an object and have keys 'name','hobbies','arr','_null','_boolean' 
    self.assertEqual(self.have_property(resp_json['json'], 'name'), True, "Should ['json'] must be an object and have key 'name' ")
    self.assertEqual(self.have_property(resp_json['json'], 'hobbies'), True, "Should ['json'] must be an object and have key 'hobbies' ")
    self.assertEqual(self.have_property(resp_json['json'], 'arr'), True, "Should ['json'] must be an object and have key 'arr' ")
    self.assertEqual(self.have_property(resp_json['json'], '_null'), True, "Should ['json'] must be an object and have key '_null' ")
    self.assertEqual(self.have_property(resp_json['json'], '_boolean'), True, "Should ['json'] must be an object and have key '_boolean' ")

    # Should ['json']['name'] to be String
    self.assertEqual(self.is_string(resp_json['json']['name']), True, "Should ['json']['name'] to be String")

    # Should ['json']['hobbies'] to be an Array
    self.assertEqual(self.is_array(resp_json['json']['hobbies']), True, "Should ['json']['hobbies'] to be an Array")

    # Should ['json']['hobbies'][0]['id'] to be Number
    self.assertEqual(self.is_number(resp_json['json']['hobbies'][0]['id']), True, "Should ['json']['hobbies'][0]['id'] to be Number")

    # Should ['json']['hobbies'][0]['name'] to be String
    self.assertEqual(self.is_string(resp_json['json']['hobbies'][0]['name']), True, "Should ['json']['hobbies'][0]['name'] to be String")

    # Should ['json']['arr'] to be an Array
    self.assertEqual(self.is_array(resp_json['json']['arr']), True, "Should ['json']['arr'] to be an Array")

    # Should ['json']['arr'][0] to be Number
    self.assertEqual(self.is_number(resp_json['json']['arr'][0]), True, "Should ['json']['arr'][0] to be Number")

    # Should ['json']['_null'] to be Null
    # Skip test ['json']['_null'] because value is Null

    # Should ['json']['_boolean'] to be a Boolean
    self.assertEqual(self.is_bool(resp_json['json']['_boolean']), True, "Should ['json']['_boolean'] to be a Boolean")

    # Should ['url'] to be String
    self.assertEqual(self.is_string(resp_json['url']), True, "Should ['url'] to be String")

