import os
from flask import Flask
from flask_restx import Api, Resource
from flask_migrate import Migrate
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from exts import db
from model import Admin

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate=Migrate(app, db)



@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Admin": Admin,
    }

if __name__ == "__main__":
    app.run()