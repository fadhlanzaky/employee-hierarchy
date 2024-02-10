'''
This contains usecases, the main task / business logic
'''

from core.shared.use_case_output import SuccessOutput, FailureOutput
from infra.db.mock import EmployeeRepository
from core.blueprints.employee.request import CreateEmployeeRequest, GetEmployeeRequest, DeleteEmployeeRequest


class BaseEmployeeUseCase:
    def __init__(self) -> None:
        self.repo = EmployeeRepository()


# adds employee to the repo
class AddEmployeeUseCase(BaseEmployeeUseCase):
    description = 'Add Employee'

    def __init__(self) -> None:
        super().__init__()


    def execute(self, req: CreateEmployeeRequest):
        try:
            # calls repo's method
            self.repo.add_employee(req.to_employee())
            return SuccessOutput(self.description, f'{req.name} added successfully')
        except Exception as e:
            print(e)
            return FailureOutput(self.description, str(e), req.to_dict())
        

# gets employee from repo, this where the recursive happens
class GetEmployeeUseCase(BaseEmployeeUseCase):
    description = 'Get Employee'

    def __init__(self) -> None:
        super().__init__()
        self.employee_hierarchy = []

    
    def execute(self, req: GetEmployeeRequest):
        try:
            # calls repo's method
            employees = self.repo.get_employees()
            self.__loop_hierarchy(employees, name=req.name)

            # no manager handler
            if len(self.employee_hierarchy) == 1:
                failed_employee = self.employee_hierarchy[0]
                raise Exception(f"Unable to process employee tree. \n\
                                {failed_employee['name']} does not have hierarchy.")

            # manager not found handler
            if self.employee_hierarchy and self.employee_hierarchy[-1].get('managerId'):
                failed_employee = self.employee_hierarchy[-1]
                raise Exception(f"Unable to process employee tree. \n\
                                 {failed_employee['name']} has manager id {failed_employee['managerId']} \
                                 but no employee found associated with id {failed_employee['managerId']}.")
            
            return SuccessOutput(self.description, 'Success', data=self.employee_hierarchy)
        except Exception as e:
            print(e)
            return FailureOutput(self.description, message=str(e))

    
    # recursive method
    def __loop_hierarchy(self, employees:list, name:str = None, manager_id:int = None):
        if name:
            employee = list(
                            filter(
                                lambda x: x['name'] == name,
                                employees
                            )
                        )

            if employee:
                if len(employee) > 1:
                    # when find more than one data, raise error
                    raise Exception(f'Failed to generate hierarchy, found duplicate data for name: {name}.')
                
                self.employee_hierarchy.extend(employee)
                self.__loop_hierarchy(employees, manager_id=employee[0]['managerId'])
            else:
                return
        
        if manager_id is not None:
            employee = list(
                            filter(
                                lambda x: x['id'] == manager_id,
                                employees
                            )
                        )

            if employee:
                if len(employee) > 1:
                    # when find more than one data, raise error
                    raise Exception(f"Failed to generate hierarchy, found duplicate data for id: {manager_id}.")
                
                self.employee_hierarchy.extend(employee)
                self.__loop_hierarchy(employees, manager_id=employee[0]['managerId'])
            else:
                return
        
        return
    

# deletes employee from repo
class DeleteEmployeeUseCase(BaseEmployeeUseCase):
    description = "Delete Employee"

    def __init__(self) -> None:
        super().__init__()

    
    def execute(self, req:DeleteEmployeeRequest):
        try:
            name = req.name

            # calls repo's method
            self.repo.delete_employee(name)
            return SuccessOutput(self.description, f"All employee(s) associated with name {name} are successfully deleted.")
        except Exception as e:
            print(e)
            return FailureOutput(self.description, str(e))