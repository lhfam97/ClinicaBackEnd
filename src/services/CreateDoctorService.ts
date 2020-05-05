import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';
import Expertise from '../models/Expertise';

interface Request {
  name: string;

  crm: string;

  expertise: string;
}

class CreateDoctorService {
  public async Execute({ name, crm, expertise }: Request): Promise<Doctor> {
    const doctorRepository = getRepository(Doctor);
    const expertiseRepository = getRepository(Expertise);

    let checkExpertiseExists = await expertiseRepository.findOne({
      where: { name: expertise },
    });
    if (!checkExpertiseExists) {
      const new_Expertise = expertiseRepository.create({
        name,
      });
      await expertiseRepository.save(new_Expertise);
      checkExpertiseExists = new_Expertise;
    }
    const doctor = doctorRepository.create({
      name,
      crm,
      expertise: checkExpertiseExists,
    });
    await doctorRepository.save(doctor);

    return doctor;
  }
}

export default CreateDoctorService;
