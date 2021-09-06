import { EntityRepository, Repository } from "typeorm";
import { Student } from "../models/Student";

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {}

export { StudentRepository };
