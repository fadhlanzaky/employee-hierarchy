from infra.db.mock import EmployeeRepository, UserRepository

def register_db():
    EmployeeRepository()
    UserRepository()