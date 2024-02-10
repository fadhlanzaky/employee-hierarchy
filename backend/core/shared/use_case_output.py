'''
Standardized output for every usecase
'''

from flask import jsonify

class BaseOutput:
    def __init__(self, usecase=None, message=None, data=None):
        self.usecase = usecase
        self.message = message
        self.data = data

    def transform(self) -> dict:
        # transform this to dictionary
        result = {
            'usecase': self.usecase,
            'message': self.message,
            'data': self.data
            }
        return jsonify(result)


# success output
class SuccessOutput(BaseOutput):
    def __init__(self, usecase=None, message=None, data=None) -> None:
        super().__init__(usecase, message, data)
    
    def __bool__(self) -> bool:
        return True
    

# fail output
class FailureOutput(BaseOutput):
    def __init__(self, usecase=None, message=None, data=None) -> None:
        super().__init__(usecase, message, data)

    def __bool__(self) -> bool:
        return False