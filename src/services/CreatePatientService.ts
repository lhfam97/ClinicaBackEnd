import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import moment from 'moment';
import Address from '../models/Address';
import Patient from '../models/Patient';
import AppError from '../errors/AppError';
interface Request {
  name: string;

  birth_date: string;

  phone: string;

  rg: string;

  cpf: string;

  street: string;

  neighborhood: string;

  number: number;

  password: string;
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
    password
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
    const checkPatientExists = await patientRepository.findOne({
      where: { cpf },
    });
    if (checkPatientExists) {
      throw new AppError('Crm already used');
    } else {
      const hashedPassword = await hash(password, 8);
      const patient = patientRepository.create({
        name,
        phone,
        birth_date: date,
        address: checkAddressExists,
        cpf,
        rg,
        password: hashedPassword
      });
      await patientRepository.save(patient);
      delete patient.password;

      return patient;
    }
  }
}

export default CreatePatientService;
