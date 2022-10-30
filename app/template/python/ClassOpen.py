import http.client
import json
import unittest

try:
    #python2
    from BaseTest import BaseTest
except ImportError:
    #python3
    from .BaseTest import BaseTest

class ClassName(BaseTest):
