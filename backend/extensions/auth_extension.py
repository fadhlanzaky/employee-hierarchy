from flask_jwt_extended import JWTManager
from flask_cors import CORS

def register_auth(app):
    JWTManager(app)
    CORS(app)