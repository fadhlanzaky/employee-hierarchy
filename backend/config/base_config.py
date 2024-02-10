import os

class BaseConfig:
    '''Base config'''
    SECRET_KEY = os.environ.get('SECRET_KEY')