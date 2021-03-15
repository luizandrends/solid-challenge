import AppError from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const findUserByEmail = this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError("Email already taken", 400);
    }

    const createUser = this.usersRepository.create({
      name,
      email,
    });

    return createUser;
  }
}

export { CreateUserUseCase };
