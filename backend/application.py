from flask import Flask
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

from extensions.config_extension import register_configs
from extensions.database_extension import register_db
from extensions.routes_extension import register_routes
from extensions.exception_extension import register_exception_handler
from extensions.auth_extension import register_auth


# initiates flask
def create_app():
    app = Flask(__name__)

    # applying all the extensions
    register_configs(app)
    register_auth(app)
    register_db()
    register_routes(app)
    register_exception_handler(app)

    return app