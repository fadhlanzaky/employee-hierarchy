'''
These mock repos are only used for the intended purposes
as per the instructions to store all the data in memory.
'''

from typing import List

from core.entity.employee import Employee
from core.entity.user import User


class EmployeeRepository():

    employees: List[dict] = []

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            print('Initiating Employee repository...')
            cls.instance = super(EmployeeRepository, cls).__new__(cls)

        return cls.instance
    

    # mimics SELECT
    def get_employees(self) -> list:
        return self.employees
    

    # mimics INSERT
    def add_employee(self, employee: Employee) -> None:
        employee = employee.to_dict()
        self.employees.append(employee)
    
    
    # mimics DELETE
    def delete_employee(self, name: str) -> None:
        deleted_employees = list(
                                filter(
                                    lambda x: x['name'] == name,
                                    self.employees
                                )
                            )
        
        self.employees = [employee for employee in self.employees 
                          if employee not in deleted_employees]
        
        deleted_ids = [employee['id'] for employee in deleted_employees]
        
        def update_manager(x):
            if x['managerId'] in deleted_ids:
                x['managerId'] = None
            return x
        
        self.employees = list(map(update_manager, self.employees))

    


class UserRepository():

    users: List[dict] = []

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            print('Initiating User Repository...')
            cls.instance = super(UserRepository, cls).__new__(cls)

        return cls.instance


    # mimics insert
    def add_user(self, user:User) -> None:
        user = user.to_dict()

        existing_user = self.__get_existing_user_by_name(user['username'])

        if existing_user:
            raise Exception('Username already exists!')
        
        self.users.append(user)
    

    # mimics SELECT
    def get_user(self, user:User) -> dict:
        return self.__get_existing_user_by_name(user.username)


    # private method
    def __get_existing_user_by_name(self, username:str) -> list:
        existing_user = list(
            filter(
                lambda x: x['username'] == username,
                self.users
            )
        )

        return existing_user

    
