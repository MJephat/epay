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

class Tenant(db.Model):
    __tablename__ = 'tenants'
    id = db.Column(db.Integer, primary_key=True)
    your_names = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    house_no = db.Column(db.String(255), nullable=False)
    members = db.Column(db.String(255), nullable=False)
    rent = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(255), nullable=False)
    def __repr__(self):
        return f"<Tenant {self.your_names} {self.phone}>"
    def save (self):
        db.session.add(self)
        db.session.commit()

    def delete (self):
        db.session.delete(self)
        db.session.commit()