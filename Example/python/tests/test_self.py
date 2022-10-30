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

class TestSelf(BaseTest):
  def test_self(self):
    sample_data = {
      "object_ak_dict" : {},
      "array_ak_list" : [],
      "number" : 1,
      "float" : 1.1,
      "int" : 1,
      "string" : "string",
      "test_error" : "Just create error"
    }

    self.assertEqual(self.is_object(sample_data), True, "Should sample_data must be an object")

    self.assertEqual(self.have_property(sample_data, 'object_ak_dict'), True, "Should sample_data must have key 'object_ak_dict' ")
    self.assertEqual(self.have_property(sample_data, 'array_ak_list'), True, "Should sample_data must have key 'array_ak_list' ")
    self.assertEqual(self.have_property(sample_data, 'number'), True, "Should sample_data must have key 'number' ")
    self.assertEqual(self.have_property(sample_data, 'string'), True, "Should sample_data must have key 'string' ")

    self.assertEqual(self.is_array(sample_data["array_ak_list"]), True, "Should sample_data['array_ak_list'] must be an array")
    self.assertEqual(self.is_number(sample_data["number"]), True, "Should sample_data['number'] must be a number")
    self.assertEqual(self.is_int(sample_data["int"]), True, "Should sample_data['int'] must be a int")
    self.assertEqual(self.is_float(sample_data["float"]), True, "Should sample_data['float'] must be a float")
    self.assertEqual(self.is_string(sample_data["string"]), True, "Should sample_data['string'] must be an string")
    self.assertEqual(self.is_number(sample_data["test_error"]), True, "test_error is string, but set number to crate error. Just change to number to solve")


if __name__ == '__main__':
  unittest.main()