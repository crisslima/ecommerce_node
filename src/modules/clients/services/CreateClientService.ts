import FindAllCategoriesService from "modules/category/services/FindAllCategoriesService";
import AppError from "../../../shared/errors/AppErrors";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindAllClientsService from "./FindAllClientsService";
import FindClientByCpfService from "./FindClientByCpfService";

/**
 * O service terá toda a regra de negócio. Cada service é responsável por
 * uma única atividade.
 *
 * Por Exemplo: Esse service é o responsável por cadastrar um usuário.
 * Todas as operações/regras/verificações que precisam ser feitas para que
 * o usuário seja cadastrado devem ser feitas aqui
 *
 * Como um service só tem uma função ele deve ter apenas UM método público,
 * geralmente chamado de execute.
 */
export default class CreateClientService {
  public async execute(data: IClientDTO): Promise<Client> {
    const clientRepository = new ClientRepository();
    const findAllClientsService = new FindAllClientsService();
    const findClientByCpfService = new FindClientByCpfService();

    let listaClientes = await findAllClientsService.execute();

    // const clientExist = await clientRepository.findByCpf(data.cpf);

    // // for (let i = 0; i < listaClientes.length; i++) {
    //   if (clientExist) {
    //     throw new AppError("Cpf já está cadastrado.");
    //   }

    await findClientByCpfService.execute(data.cpf);
    // }

    if (data.id) {
      throw new AppError("Id do Cliente não deve ser enviado no cadastro");
    }

    const client = await clientRepository.create(data);

    return client;
  }
}
