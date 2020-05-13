import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';
import { hash } from 'bcryptjs';
import Expertise from '../models/Expertise';
import AppError from '../errors/AppError';
interface Request {
  name: string;

  crm: string;

  expertise: string;

  password: string;
}

class CreateDoctorService {
  public async Execute({ name, crm, expertise, password }: Request): Promise<Doctor> {
    const doctorRepository = getRepository(Doctor);

    const expertiseRepository = getRepository(Expertise);


    let checkExpertiseExists = await expertiseRepository.findOne({
      where: { name: expertise },
    });
    if (!checkExpertiseExists) {
      const new_Expertise = expertiseRepository.create({
        name: expertise,
      });
      await expertiseRepository.save(new_Expertise);
      checkExpertiseExists = new_Expertise;
    }

    const checkDoctorExists = await doctorRepository.findOne({
      where: { crm },
    });
    if (checkDoctorExists) {
      throw new AppError('Crm already used');
    } else {
      const hashedPassword = await hash(password, 8);
      const doctor = doctorRepository.create({
        name,
        crm,
        expertise: checkExpertiseExists,
        password: hashedPassword
      });
      await doctorRepository.save(doctor);
      delete doctor.password;

      return doctor;
    }
  }
}
export default CreateDoctorService;
