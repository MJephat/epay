import os
from flask import Flask,request,jsonify,make_response
from flask_restx import Api, Resource,fields
from flask_migrate import Migrate
from config import DevConfig
from flask_sqlalchemy import SQLAlchemy
from exts import db
from model import Admin,Tenant, Stima
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,get_jwt_identity, create_access_token, create_refresh_token, jwt_required
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app)

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

tenant_model =api.model(
    "Upload",
    {
        "your_names":fields.String(),
        "phone":fields.String(),
        "address":fields.String(),
        "city":fields.String(),
        "house_no":fields.String(),
        "rent":fields.String(),
        "members":fields.String(),
        "zip_code":fields.String(),
    }
)

stima_model = api.model(
    "StimaResource",
    {
        "month":fields.String(),
        "bill":fields.String(),
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


@api.route("/upload", methods=["POST"])
class Upload(Resource):
    @api.expect(tenant_model)
    def post(self):
        # add new tenant
        data=request.get_json()

        new_tenant=Tenant(
            your_names=data.get('your_names'),
            phone=data.get('phone'),
            address=data.get('address'),
            city=data.get('city'),
            house_no=data.get('house_no'),
            rent=data.get('rent'),
            members=data.get('members'),
            zip_code=data.get('zip_code'),
        )
        db.session.add(new_tenant)
        db.session.commit()
        return make_response(jsonify({"message":"Admin created successfully"}))


@api.route("/tenants", methods=['GET'])
class TenantsList(Resource):
    @api.marshal_list_with(tenant_model)
    def get(self):
        """Get all tenants"""
        tenants = Tenant.query.all()
        return tenants   

# update Route
# @api.route('/tenants/<int:tenant_id>', methods=['PUT'])
# class UpdateTenant(Resource):
#     @api.marshal_with(tenant_model)
#     def put(self, tenant_id):
        """Update a Tenant info by id"""
        # tenant_to_update=Tenant.query.get_or_404(id)

        # data=request.get_json()

        # tenant_to_update.update(data.get('your_names'),data.get('phone'),data.get('address'),data.get('city'),data.get('house_no'),data.get('members'),data.get('zip_code'))

        # return tenant_to_update
@app.route("/tenats/<int:tenant_id>", methods=['PATCH'])
def update_report(report_id):
        tenant = Tenant.query.get(tenant_id)
        if not tenant:
            return jsonify({'error': 'Tenant not found.'}), 404
        # Get the updated data from the request
        data = request.json
        # Update the tenant fields with the new data
        tenant.your_names = data.get('your_names', tenant.your_names)
        tenant.phone = data.get('phone', tenant.phone)
        tenant.address = data.get('address', tenant.address)
        tenant.city = data.get('city', tenant.city)
        tenant.house_no = data.get('house_no', tenant.house_no)
        tenant.rent = data.get('rent', tenant.rent)
        tenant.members = data.get('members', tenant.members)
        tenant.zip_code = data.get('zip_code', tenant.zip_code)
        # Commit the changes to the database
        db.session.commit()
        return jsonify({'message': 'tenant updated successfully.'})

  

# deleting route
@api.route('/tenants/<int:tenant_id>', methods=['DELETE'])
class DeleteTenant(Resource):
    @api.marshal_with(tenant_model)
    def delete(self, tenant_id):
        tenant_delete=Tenant.query.get_or_404(tenant_id)

        tenant_delete.delete()
        return make_response(jsonify ({"message":"Tenants deleted successfully"})), 200

        
@api.route("/stima", methods=["POST"])
class StimaResource(Resource):
    @api.expect(stima_model)
    def post(self):
        # add new tenant
        data=request.get_json()

        new_stimabill=Stima(
            month=data.get('month'),
            bill=data.get('bill'),

        )
        db.session.add(new_stimabill)
        db.session.commit()
        return make_response(jsonify({"message":"Bill uploaded successfully"}))

@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Admin": Admin,
        "Tenant": Tenant,
        "Stima": Stima,
    }

if __name__ == "__main__":
    app.run()