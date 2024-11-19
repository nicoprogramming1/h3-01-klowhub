import { Model } from "sequelize";
import { Platform, Sector, Tag } from "./interfaces/product.interface";

export abstract class ProductModel extends Model {
  public id!: string;
  public title!: string;
  public detail!: string;
  public platform!: Platform;
  public image!: string
  public sector!: Sector
  public tags!: Tag[];
  public price!: number;
  public ownerId!: string;
}
