# Auto create at Sun Oct 30 2022 
import unittest

class BaseTest(unittest.TestCase):
  # https://docs.python.org/2/library/json.html#json-to-py-table
  def have_property(self, obj, key):
    return key in obj

  def is_object(self, obj):
    return isinstance(obj, dict)

  def is_array(self, data):
    return isinstance(data, list)

  def is_float(self, data):
    return isinstance(data, float)

  def is_int(self, data):
    return isinstance(data, int)

  def is_number(self, data):
    return self.is_int(data) or self.is_int(data)

  def is_unicode(self, data):
    return isinstance(data, unicode)

  def is_string(self, data):
    return isinstance(data, str) or self.is_unicode(data)

  def is_bool(self, data):
    return isinstance(data, bool)
