'''
This is contains all the endpoints. Created as blueprints.
'''

from flask import Blueprint, render_template, request, jsonify
from core.blueprints.employee.use_cases import AddEmployeeUseCase, DeleteEmployeeUseCase, GetEmployeeUseCase
from core.shared.exceptions import BadRequestException, NotFoundException
from core.shared.request import InvalidRequest

from core.entity.employee import Employee
from core.blueprints.employee.request import CreateEmployeeRequest, DeleteEmployeeRequest, GetEmployeeRequest
from http import HTTPStatus
from infra.db.mock import EmployeeRepository
from flask_jwt_extended import jwt_required


employee_bp = Blueprint(
    "employee_hierarchy",
    __name__,
    template_folder="template",
    static_folder="static",
    static_url_path="/employee-static"
)


@employee_bp.route("/", methods=['GET'])
@jwt_required()
def home():
    employee_repo = EmployeeRepository().get_employees()
    result = {'employees': employee_repo}
    return jsonify(result), 200


# add employee
@employee_bp.route("/api/add", methods=['POST'])
@jwt_required()
def add_employee():
    payload = request.get_json()

    # objectify request
    req = CreateEmployeeRequest().validate(payload)
    
    if not req:
        raise BadRequestException(req.error, HTTPStatus.BAD_REQUEST)
    
    # execute use case
    result = AddEmployeeUseCase().execute(req)
    
    # exceptions
    if not result:
        raise BadRequestException(result.message, HTTPStatus.CONFLICT)
    
    return result.transform(), HTTPStatus.CREATED


# get employee by name
@employee_bp.route("/api/get/<name>", methods=['GET'])
@jwt_required()
def get_employee(name):
    # objectify request
    req = GetEmployeeRequest().validate(name)

    if not req:
        raise BadRequestException(req.error, HTTPStatus.BAD_REQUEST)
    
    # execute use case
    result = GetEmployeeUseCase().execute(req)

    # exceptions
    if not result:
        raise BadRequestException(result.message, HTTPStatus.CONFLICT)
    elif result and len(result.data) == 0:
        raise NotFoundException('Employee not found', HTTPStatus.NOT_FOUND)

    return result.transform(), HTTPStatus.OK


# delete employee by name
@employee_bp.route("/api/delete/<name>", methods=['DELETE'])
@jwt_required()
def delete_employee(name):
    # objectify request
    req = DeleteEmployeeRequest().validate(name)

    if not req:
        raise BadRequestException(req.error, HTTPStatus.BAD_REQUEST)
    
    # execute use case
    result = DeleteEmployeeUseCase().execute(req)

    # exceptions
    if not result:
        raise BadRequestException(result.message, HTTPStatus.CONFLICT)
    
    return result.transform(), HTTPStatus.OK
    