'''
This contains classes to objectify transactions request related to authentications.
'''

from core.shared.request import InvalidRequest
from core.entity.user import User
from werkzeug.security import generate_password_hash, check_password_hash

class SignUpRequest:

    schema = set(User().to_dict().keys())

    def __init__(self, username:str = None, password:str = None):
        self.username = username
        self.password = password

    @classmethod
    def validate(cls, payload:dict):
        # validates request's body. refers to User schema.
        # if valid, returns itself else InvalidRequest()
        try:

            if set(payload.keys()).difference(cls.schema):
                return InvalidRequest('Invalid Request Body')
            
            cls.username = str(payload['username']).lower()
            # encrypt password from request
            cls.password = str(generate_password_hash(payload['password']))

            return cls(cls.username, cls.password)

        except Exception as e:
            return InvalidRequest('Bad Request')
    

    def to_user(self) -> User:
        # this to User()
        return User(**self.__dict__)
    

    def to_dict(self) -> dict:
        # this to dictionary
        return {
            'username': self.username,
            'password': self.password,
        }
    

class SignInRequest():
    schema = set(User().to_dict().keys())

    def __init__(self, username:str = None, password:str = None):
        self.username = username
        self.password = password

    @classmethod
    def validate(cls, payload:dict):
        # validates request's body. refers to User schema.
        # if valid, returns itself else InvalidRequest()
        try:

            if set(payload.keys()).difference(cls.schema):
                return InvalidRequest('Invalid Request Body')
            
            cls.username = str(payload['username']).lower()
            cls.password = str(payload['password'])

            return cls(cls.username, cls.password)

        except Exception as e:
            return InvalidRequest('Bad Request')
    

    def to_user(self) -> User:
        # this to User()
        return User(**self.__dict__)
    

    def to_dict(self) -> dict:
        # this to dictionary
        return {
            'username': self.username,
            'password': self.password,
        }