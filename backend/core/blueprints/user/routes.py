'''
This is contains all the endpoints. Created as blueprints.
'''

from flask import Blueprint, request, jsonify
from http import HTTPStatus

from core.blueprints.user.request import SignInRequest, SignUpRequest
from core.blueprints.user.use_cases import SignInUseCase, SignUpUseCase
from core.shared.exceptions import BadRequestException, NotAuthorizedException

from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

user_bp = Blueprint(
    "user",
    __name__,
    template_folder="template",
    static_folder="static",
    static_url_path="/user-static"
)

# sign up
@user_bp.route("/api/auth/signup", methods=['POST'])
def user_signup():
    payload = request.get_json()

    req = SignUpRequest().validate(payload)

    if not req:
        raise BadRequestException(req.error, HTTPStatus.BAD_REQUEST)
    
    # execute use case
    result = SignUpUseCase().execute(req)

    # exceptions
    if not result:
        raise BadRequestException(result.message, HTTPStatus.CONFLICT)
    
    return result.transform(), HTTPStatus.CREATED


# sign in
@user_bp.route("/api/auth/signin", methods=["POST"])
def user_signin():
    payload = request.get_json()

    req = SignInRequest().validate(payload)

    if not req:
        BadRequestException(req.error, HTTPStatus.BAD_REQUEST)
    
    # execute use case
    result = SignInUseCase().execute(req)

    # exceptions
    if not result and result.data == 401:
        raise NotAuthorizedException(result.message, HTTPStatus.UNAUTHORIZED)
    elif not result:
        raise BadRequestException(result.message, HTTPStatus.CONFLICT)
    
    return result.transform(), HTTPStatus.OK


# refresh jwt token
@user_bp.route("/api/auth/refresh", methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({'access_token': new_access_token}), HTTPStatus.OK