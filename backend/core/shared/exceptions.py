'''
All custom exceptions
'''

from http import HTTPStatus

class BadRequestException(Exception):
    
    def __init__(self, description, code) -> None:
        super().__init__(self)
        self.description = description
        self.code = code


class NotFoundException(Exception):

    def __init__(self, description, code=HTTPStatus.NOT_FOUND) -> None:
        self.description = description
        self.code = HTTPStatus.NOT_FOUND


class NotAuthorizedException(Exception):

    def __init__(self, description, code=HTTPStatus.UNAUTHORIZED) -> None:
        self.description = description
        self.code = HTTPStatus.UNAUTHORIZED