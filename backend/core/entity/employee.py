'''
Employee base schema
'''

from ..entity import Base
from dataclasses import dataclass

@dataclass
class Employee(Base):
    id: int = None
    name: str = None
    managerId: str = None