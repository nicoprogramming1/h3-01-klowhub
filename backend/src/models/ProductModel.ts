import { Model } from "sequelize";

enum Tag {
  TAG1 = "Tag 1",
  TAG2 = "Tag 2",
  TAG3 = "Tag 3",
  TAG4 = "Tag 4",
}

export abstract class ProductModel extends Model {
  public id!: string;
  public title!: string;
  public detail!: string;
  public tags!: Tag[];
  public price!: number;
  public ownerId!: string;
}
