const bcrypt = require('bcrypt');
const sequelize = require('../connection');
const { Model, Datatypes } = require('sequelize');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len:[4, 25]
            }
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    }
);

module.exports = User;