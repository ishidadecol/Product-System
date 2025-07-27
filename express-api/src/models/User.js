import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import {sequelize} from "../database.js";

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // auto-generate UUID
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false
    }
)

// Hash password before saving
User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});

export default User;