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

class HttpsPostmanEchoComGet(BaseTest):

  # https://postman-echo.com/get
  def test_https_postman_echo_com_get(self):
    
    conn = http.client.HTTPSConnection("postman-echo.com")
    
    conn.request("GET", "/get")
    
    res = conn.getresponse()
    data = res.read()
    
    # print(data.decode("utf-8"))
    conn.close()
    resp_json = json.loads(data.decode("utf-8"))

    # SKIP TEST NO DATA

