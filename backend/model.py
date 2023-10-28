from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Table, Integer

from exts import db

#  admin model class
class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    def __repr__(self):
        return f"<Admin {self.username} {self.password}>"

    def save(self):
        db.session.add(self)
        db.session.commit()