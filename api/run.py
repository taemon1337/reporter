from eve import Eve
from flask import current_app, Response, send_file 
from os import getenv
from gridfs import GridFS
from bson.objectid import ObjectId
from docxtpl import DocxTemplate
from io import BytesIO, StringIO

def get_template_file(template):
  fs = GridFS(app.data.driver.db)
  return fs.get(template["file"])

def stream_document(doc, filename="download.docx", mimetype="application/octect-stream"):
  buff = BytesIO()
  doc.save(buff)
  buff.seek(0)
  return send_file(buff, attachment_filename=filename, as_attachment=True)

def send_gridfs_file(record):
  resp = Response()
  if record:
    resp.cache_control.no_store = True
    resp.cache_control.max_age = 0
    fs = GridFS(app.data.driver.db)
    fi = fs.get(record["_id"])
    resp.set_data(fi.read())
    resp.mimetype = record["contentType"]
    return resp
  else:
    return resp, 404

template_schema = {
  'name': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string'
  },
  'profile': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'profiles',
      'field': '_id',
      'embeddable': True
    }
  },
  'file': {
    'type': 'media'
  }
}
profile_schema = {
  'name': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string'
  },
  'fields': {
    'type': 'dict',
    'default': {}
  }
}
report_schema = {
  'title': {
    'type': 'string',
    'required': True,
    'unique': True
  },
  'description': {
    'type': 'string'
  },
  'fields': {
    'type': 'dict',
    'default': {}
  },
  'base_profile': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'profiles',
      'field': '_id',
      'embeddable': True
    }
  },
  'profile': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'profiles',
      'field': '_id',
      'embeddable': True
    }
  },
  'template': {
    'type': 'objectid',
    'data_relation': {
      'resource': 'templates',
      'field': '_id',
      'embeddable': True
    }
  }
}


settings = {
  'URL_PREFIX': 'api',
  'RESOURCE_METHODS': ['GET','POST'],
  'MONGO_HOST': 'mongo',
  'MONGO_PORT': 27017,
  'MONGO_DBNAME': 'reporter-db',
  'RESOURCE_METHODS': ['GET','POST'],
  'ITEM_METHODS': ['GET','PUT','PATCH','DELETE'],
#  'MULTIPART_FORM_FIELDS_AS_JSON': True,
  'RETURN_MEDIA_AS_URL': True,
  'RETURN_MEDIA_AS_BASE64_STRING': False,
  'EXTENDED_MEDIA_INFO': ['name','length','content_type'],
  'MEDIA_ENDPOINT': 'raw',
  'DATE_FORMAT': '%Y-%m-%d %H:%M:%S',
  'DOMAIN': {
    'templates': {
      'embedded_fields': ['profile'],
      'schema': template_schema
    },
    'profiles': {
      'schema': profile_schema
    },
    'profile-fields': {
      'schema': profile_schema,
      'datasource': {
        'source': 'profiles',
        'projection': { 'fields': 1 }
      }
    },
    'reports': {
      'embedded_fields': ['template','profile','base_profile'],
      'schema': report_schema
    }
  }
}

app = Eve(settings=settings)

@app.route('/api/reports/<report_id>/download', methods=["GET"])
def download_report(report_id):
  reports = app.data.driver.db['reports']
  templates = app.data.driver.db['templates']
  profiles = app.data.driver.db['profiles']

  report = reports.find_one({ "_id": ObjectId(report_id) })
  if report:
    template = templates.find_one({ "_id": report['template'] })
    if template:
      base = profiles.find_one({ "_id": report['base_profile'] })
      if base:
        profile = profiles.find_one({ "_id": report['profile'] })
        if profile:
          tmpl = get_template_file(template)
          if tmpl:
            doc = DocxTemplate(tmpl)
            options = base.copy()
            options.update(profile)
            options.update(report["fields"])
            app.logger.info("RENDER OPTS: ", repr(options))
            doc.render(options)
            return stream_document(doc, filename="{0}.docx".format(report["title"]))
          else:
            raise Exception("Could not read template: {0}".format(repr(template)))
        else:
          raise Exception("Could not find profile: {0}".format(report['profile']))
      else:
        raise Exception("Could not find base profile: {0}".format(report['base_profile']))
    else:
      raise Exception("Could not find template: {0}".format(report['template']))
  else:
    raise Exception("Could not find report: {0}".format(report_id))


if __name__ == "__main__":
  host = getenv("HOST","0.0.0.0")
  port = int(getenv("PORT","8080"))
  debug = getenv("DEBUG",True)
  app.run(host=host, port=port, debug=debug)

