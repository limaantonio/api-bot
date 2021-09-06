import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { StudentRepository } from "../repository/StudentyRepository";

class StudentController {
  async list(request: Request, response: Response) {
    const studentsRepository = getCustomRepository(StudentRepository);

    try {
      const students = await studentsRepository.find();

      return response.json(students);
    } catch (error) {
      return response.json(error);
    }
  }

  async create(request: Request, response: Response) {
    const { name, registration } = request.body;

    const studentsRepository = getCustomRepository(StudentRepository);

    try {
      const students = studentsRepository.create({
        name: name,
        registration: registration,
      });

      await studentsRepository.save(students);

      return response.json(students);
    } catch (error) {
      return response.json(error);
    }
  }
}

export { StudentController };
