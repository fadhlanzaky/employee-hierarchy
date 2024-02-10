'''
This contains classes to objectify transactions request related to employee.
'''

from core.shared.request import InvalidRequest
from core.entity.employee import Employee


class CreateEmployeeRequest:

    schema = set(Employee().to_dict().keys())

    def __init__(self, id:int = None, name:str = None, managerId = None):
        self.id = id
        self.name = name
        self.managerId = managerId

    @classmethod
    def validate(cls, payload:dict):
        # validates request's body. refers to Employee schema.
        # if valid, returns itself else InvalidRequest()
        try:

            if set(payload.keys()).difference(cls.schema):
                return InvalidRequest('Invalid Request Body', payload)
            
            cls.id = int(payload['id'])
            cls.name = str(payload['name'])
            cls.managerId = None if not payload['managerId'] else int(payload['managerId'])

            return cls(cls.id, cls.name, cls.managerId)

        except Exception as e:
            return InvalidRequest('Bad Request', payload)
    

    def to_employee(self) -> Employee:
        # this to Employee()
        return Employee(**self.__dict__)
    

    def to_dict(self) -> dict:
        # this to dictionary
        return {
            'id': self.id,
            'name': self.name,
            'managerId': self.managerId
        }
    

class GetEmployeeRequest:
    def __init__(self, name:str = None) -> None:
        self.name = name

    @classmethod
    def validate(cls, name:str = None):
        # validates request. name is mandatory
        # if valid, returns itself else InvalidRequest()
        if not name:
            return InvalidRequest('Invalid Request', name)
        
        return cls(name)
    
    def to_dict(self) -> dict:
        # this to dict
        return {'name': self.name}


class DeleteEmployeeRequest:
    def __init__(self, name:str = None) -> None:
        self.name = name
    
    @classmethod
    def validate(cls, name:str = None):
        # validates request. name is mandatory
        # if valid, returns itself else InvalidRequest()
        if not name:
            return InvalidRequest('Invalid Request', name)
        
        return cls(name)
    
    def to_dict(self) -> dict:
        # this to dict
        return {'name': self.name}
