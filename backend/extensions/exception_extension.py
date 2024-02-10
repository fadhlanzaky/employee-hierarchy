from core.shared.exceptions import BadRequestException, NotFoundException, NotAuthorizedException
from werkzeug.exceptions import HTTPException

def error_handler(error):
    response = {
        'message': error.description
    }

    return response, error.code

def register_exception_handler(app):
    app.register_error_handler(BadRequestException, error_handler)
    app.register_error_handler(NotFoundException, error_handler)
    app.register_error_handler(NotAuthorizedException, error_handler)
    app.register_error_handler(HTTPException, error_handler)