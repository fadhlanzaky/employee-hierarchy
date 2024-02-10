'''
This contains usecases, the main task / business logic
'''


from core.shared.use_case_output import SuccessOutput, FailureOutput
from infra.db.mock import UserRepository
from core.blueprints.user.request import SignUpRequest, SignInRequest
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token

class BaseUserUseCase:
    def __init__(self) -> None:
        self.repo = UserRepository()


class SignUpUseCase(BaseUserUseCase):
    description = 'Signup'

    def __init__(self) -> None:
        super().__init__()

    def execute(self, req: SignUpRequest):
        try:
            # calls repo's method
            self.repo.add_user(req.to_user())
            return SuccessOutput(self.description, 'Account created!')
        except Exception as e:
            print(e)
            return FailureOutput(self.description, str(e), req.to_dict())
        

class SignInUseCase(BaseUserUseCase):
    description = 'Signin'

    def __init__(self) -> None:
        super().__init__()

    def execute(self, req: SignInRequest):
        try:

            # calls repo's method
            user = self.repo.get_user(req.to_user())
            if len(user) < 1:
                return FailureOutput(self.description, 'Not authorized', data=401)
            
            user = user[0]

            # checks password hash
            if check_password_hash(user['password'], req.password):
                tokens = {
                    'access_token': create_access_token(identity=user['username']),
                    'refresh_token': create_refresh_token(identity=user['username'])
                }
                return SuccessOutput(self.description, f"Welcome {user['username']}!", tokens)
            else:
                return FailureOutput(self.description, 'Not authorized', data=401)
        except Exception as e:
            print(e)
            return FailureOutput(self.description, str(e))