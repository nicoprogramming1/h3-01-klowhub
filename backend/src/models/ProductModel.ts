import { Model } from "sequelize";

enum Tag {
  TAG1 = "Tag 1",
  TAG2 = "Tag 2",
  TAG3 = "Tag 3",
}

enum Platform {
  APPSHEET = "AppSheet",
  POWERAPPS = "PowerApps",
}

enum Sector {
    ECOMMERCE = "Ecommerce",
    INDUSTRY = "Industry",
    EDUCATIONAL = "Educational",
    MANAGEMENT = "Management",
    TECHNOLOGY = "Technology"
}

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
