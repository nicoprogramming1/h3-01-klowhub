import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

function generateShortID(): string {
    return (
        Date.now().toString(36).substring(0, 6) +
        Math.random().toString(36).substring(2, 6)
    ).substring(0, 10);
}

class DeviceSession extends Model {
    public id!: string;
    public userId!: string;
    public app!: string;
    public device!: string;
    public country!: string;
    public city!: string;
    public ipAddress!: string;
    public isActive!: boolean;
}

DeviceSession.init(
    {
        id: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            defaultValue: generateShortID,
        },
        app: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        device: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "DeviceSession",
        tableName: "device_sessions",
        timestamps: true,
        hooks: {
            beforeCreate: (session: DeviceSession) => {
                session.id = generateShortID();
            },
        },
    }
);

export default DeviceSession;