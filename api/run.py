from eve import Eve
from os import getenv

MONGO_HOST = getenv("MONGO_HOST","mongo")
MONGO_PORT = int(getenv("MONGO_PORT", "27017"))
MONGO_DBNAME = getenv("MONGO_DBNAME","report-db")

autocomplete_schema = {
  'key': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'value_json': {
    'type': 'string',
    'required': True
  }
}

survey_schema = {
  'title': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'version': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string'
  },
  'pages': {
    'type': 'list',
    'required': True,
    'default': []
  }
}

report_schema = {
  'title': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'state': {
    'type': 'string',
    'required': True,
    'allowed': ['new','draft','review','approved']
  },
  'comments': {
    'type': 'list'
  },
  'description': {
    'type': 'string'
  },
  'data': {
    'type': 'dict'
  }
}

settings = {
  'URL_PREFIX': 'api',
  'MONGO_HOST': MONGO_HOST,
  'MONGO_PORT': MONGO_PORT,
  'MONGO_DBNAME': MONGO_DBNAME,
  'RESOURCE_METHODS': ['GET','POST'],
  'ITEM_METHODS': ['GET','PUT','PATCH','DELETE'],
#  'MULTIPART_FORM_FIELDS_AS_JSON': True,
  'RETURN_MEDIA_AS_URL': True,
  'RETURN_MEDIA_AS_BASE64_STRING': False,
  'EXTENDED_MEDIA_INFO': ['name','length','content_type'],
  'MEDIA_ENDPOINT': 'raw',
  'DATE_FORMAT': '%Y-%m-%d %H:%M:%S',
  'DOMAIN': {
    'autocompletes': {
      'schema': autocomplete_schema
    },
    'surveys': {
      'schema': survey_schema
    },
    'reports': {
      'schema': report_schema
    }
  }
}

app = Eve(settings=settings)

if __name__ == "__main__":
  host = getenv("HOST","0.0.0.0")
  port = int(getenv("PORT","8080"))
  debug = getenv("DEBUG",True)
  app.run(host=host, port=port, debug=debug)

