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

class CreatePostNoExample(BaseTest):

  # Create POST No Example
  def test_create_post_no_example(self):
    
    conn = http.client.HTTPSConnection("postman-echo.com")
    
    payload = "{\n    \"name\": \"indaam\",\n    \"hobbies\": [{\n        \"id\" : 0,\n        \"name\" : \"coding\"\n    }],\n    \"arr\" : [0, \"1\"]\n}"
    
    conn.request("POST", "/post", payload)
    
    res = conn.getresponse()
    data = res.read()
    
    # print(data.decode("utf-8"))
    conn.close()
    resp_json = json.loads(data.decode("utf-8"))

    # SKIP TEST NO DATA

