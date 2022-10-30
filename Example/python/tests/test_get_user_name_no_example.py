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

class GetUserNameNoExample(BaseTest):

  # Get User Name No Example
  def test_get_user_name_no_example(self):
    
    conn = http.client.HTTPSConnection("postman-echo.com")
    
    conn.request("GET", "/get?id=1&name=indaam")
    
    res = conn.getresponse()
    data = res.read()
    
    # print(data.decode("utf-8"))
    conn.close()
    resp_json = json.loads(data.decode("utf-8"))

    # SKIP TEST NO DATA

