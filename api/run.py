from eve import Eve
from os import getenv

MONGO_HOST = getenv("MONGO_HOST","mongo")
MONGO_PORT = int(getenv("MONGO_PORT", "27017"))
MONGO_DBNAME = getenv("MONGO_DBNAME","report-db")

scheme_schema = {
  'name': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string',
    'default': ''
  },
  'version': {
    'type': 'string',
    'default': '1.0'
  },
  'jsonschema': {
    'type': 'dict',
    'schema': {
      'title': {
        'type': 'string',
        'required': True
      },
      'type': {
        'type': 'string',
        'allowed': ['object','array','string']
      },
      'properties': {
        'type': 'dict',
        'default': {}
      },
      'required': {
        'type': 'list',
        'default': []
      }
    }
  }
}


layout_schema = {
  'name': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string',
    'default': ''
  },
  'version': {
    'type': 'string',
    'default': '1.0'
  },
  'template': {
    'type': 'string'
  }
}

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

report_schema = {
  'title': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'subtitle': {
    'type': 'string'
  },
  'state': {
    'type': 'string',
    'default': 'draft',
    'allowed': ['draft','review','approved','rejected']
  },
  'comments': {
    'type': 'string',
    'default': ''
  },
  'report_json': {
    'type': 'string',
    'default': '{}'
  },
  'scheme': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'schemes',
      'field': '_id',
      'embeddable': True
    }
  },
  'layout': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'layouts',
      'field': '_id',
      'embeddable': True
    }
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
  'CACHE_CONTROL': 'max-age:0,must-revalidate',
  'DATE_FORMAT': '%Y-%m-%d %H:%M:%S',
  'BANDWIDTH_SAVER': False, # always respond with full object (so resp after a save is same as GET)
  'DOMAIN': {
    'autocompletes': {
      'schema': autocomplete_schema
    },
    'schemes': {
      'schema': scheme_schema
    },
    'layouts': {
      'schema': layout_schema
    },
    'reports': {
      'schema': report_schema,
      'embedded_fields': ['scheme', 'layout']
    }
  }
}

app = Eve(settings=settings)

if __name__ == "__main__":
  host = getenv("HOST","0.0.0.0")
  port = int(getenv("PORT","8080"))
  debug = getenv("DEBUG",True)
  app.run(host=host, port=port, debug=debug)

