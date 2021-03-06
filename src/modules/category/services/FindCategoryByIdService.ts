import AppError from "../../../shared/errors/AppErrors";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";

export default class FindCategoryByIdService {
  public async execute(id: number): Promise<Category> {
    const categoryRepository = new CategoryRepository();

    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Categoria inexistente");
    }

    return category;
  }
}
