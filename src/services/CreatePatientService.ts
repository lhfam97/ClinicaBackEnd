import { getRepository } from 'typeorm';

import moment from 'moment';
import Address from '../models/Address';
import Patient from '../models/Patient';

interface Request {
  name: string;

  birth_date: string;

  phone: string;

  rg: string;

  cpf: string;

  street: string;

  neighborhood: string;

  number: number;
}

class CreatePatientService {
  public async Execute({
    name,
    birth_date,
    phone,
    rg,
    cpf,
    street,
    neighborhood,
    number,
  }: Request): Promise<Patient> {
    const patientRepository = getRepository(Patient);
    const addressRepository = getRepository(Address);
    const moment_date = moment(birth_date, 'DD/MM/YYYY');
    const date = new Date(moment_date.toString());
    let checkAddressExists = await addressRepository.findOne({
      where: { street, neighborhood, number },
    });
    if (!checkAddressExists) {
      const new_Address = addressRepository.create({
        street,
        neighborhood,
        number,
      });

      await addressRepository.save(new_Address);
      checkAddressExists = new_Address;
    }
    const patient = patientRepository.create({
      name,
      phone,
      birth_date: date,
      address: checkAddressExists,
      cpf,
      rg,
    });
    await patientRepository.save(patient);

    return patient;
  }
}

export default CreatePatientService;
