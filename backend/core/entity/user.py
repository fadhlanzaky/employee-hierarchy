'''
User base schema
'''

from ..entity import Base
from dataclasses import dataclass

@dataclass
class User(Base):
    username: str = None
    password: str = None