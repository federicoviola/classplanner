bind = "0.0.0.0:8080"
workers = 2

import sys
path = 'C:\Users\marti\Documents\GitHub\classplanner'
if path not in sys.path:
   sys.path.insert(0, path)

from app import app as application