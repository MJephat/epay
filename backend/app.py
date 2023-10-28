import os
from flask import Flask,request,jsonify,make_response
from flask_restx import Api, Resource,fields
from flask_migrate import Migrate
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from exts import db
from model import Admin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,get_jwt_identity, create_access_token, create_refresh_token, jwt_required


app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate=Migrate(app, db)
api= Api(app)
JWTManager(app)



# serializers
signup_model =api.model(
    "Signup",
    { 
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()

    }
)

login_model = api.model(
    "Login",
    {
        "email":fields.String(),
        "password":fields.String()
    }
)

# *************************ADMIN AREA ************************
# admin signup route
@api.route('/signup', methods=['POST'])
class Signup(Resource):
    @api.expect(signup_model)
    def post(self):
        #get admin data
        data=request.get_json()

        # check admin if the email exists
        email=data.get('email')
        db_admin = Admin.query.filter_by(email=email).first()

        if db_admin is not None:
            return jsonify({"message":f"admin with email {email} already exists"})

        # create an admin
        new_admin=Admin(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        db.session.add(new_admin)
        db.session.commit()
        return make_response(jsonify({"message":"Admin created successfully"}))

@api.route("/login", methods=["POST"])
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data=request.get_json()

        email=data.get('email')
        password=data.get('password')

        db_admin = Admin.query.filter_by(email=email).first()

        if db_admin and check_password_hash(db_admin.password, password):

            access_token=create_access_token(identity=db_admin.username, fresh=True)
            refresh_token=create_refresh_token(identity=db_admin.username)

            return jsonify({"acess_token": access_token, "refresh_token": refresh_token})


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Admin": Admin,
    }

if __name__ == "__main__":
    app.run()