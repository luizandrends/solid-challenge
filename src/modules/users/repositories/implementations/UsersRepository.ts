import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const userData = {
      email,
      name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    Object.assign(user, { id: uuidV4() }, userData);
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === receivedUser.id
    );

    this.users[findIndex].admin = true;

    return this.users[findIndex];
  }

  list(): User[] {
    const userList = this.users.map((user) => {
      return user;
    });

    return userList;
  }
}

export { UsersRepository };
