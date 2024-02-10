'''
All invalid requests will be objectified as InvalidRequest()
'''

class InvalidRequest:
    def __init__(self, error:str = None, params:dict = None):
        self.error = error
        self.params = error

    def __bool__(self) -> bool:
        return False