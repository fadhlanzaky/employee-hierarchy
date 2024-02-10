from core.blueprints.employee import routes as employee_routes
from core.blueprints.user import routes as user_routes

def register_routes(app):
    app.register_blueprint(employee_routes.employee_bp)
    app.register_blueprint(user_routes.user_bp)