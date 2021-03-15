import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;

      const createUser = this.createUserUseCase.execute({
        name,
        email,
      });

      return response.status(201).json(createUser);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}

export { CreateUserController };
