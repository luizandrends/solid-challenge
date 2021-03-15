import AppError from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (!user.admin) {
      throw new AppError("Only admins can list the users", 400);
    }

    const usersList = this.usersRepository.list();

    return usersList;
  }
}

export { ListAllUsersUseCase };
