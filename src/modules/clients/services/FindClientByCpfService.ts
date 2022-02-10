import AppError from "../../../shared/errors/AppErrors";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";

export default class FindClientByCpfService {
  public async execute(cpf: string): Promise<void> {
    const clientRepository = new ClientRepository();

    const client = await clientRepository.findByCpf(cpf);

    if (client) {
      throw new AppError("Cpf já cadastrado");
    }

    // return client;
  }
}
