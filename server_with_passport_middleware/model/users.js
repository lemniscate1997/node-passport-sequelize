const bcrypt = require('bcrypt');
const general = require('../utils/general');

class UsersModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            },
            userid: {
                type: DataTypes.UUID,
                allowNull: true,
                primaryKey: true,
                validate: {
                    isUUID: 4
                },
                defaultValue: () => general.genUUID()
            },
            firstname: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    max: 20
                }
            },
            lastname: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    max: 20
                }
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true,
                validate: {
                    max: 50
                }
            },
            contact: {
                type: DataTypes.STRING(10),
                allowNull: true,
                validate: {
                    len: [10, 10]
                }
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            role: {
                type: DataTypes.STRING(15),
                allowNull: true,
                validate: {
                    max: 15
                }
            },
            isactive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            modelName: "users",
            sequelize
        });
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }

    async generateHash() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(text) {
        const match = await bcrypt.compare(text, this.password);
        if (match) {
            return true;
        }
        return false;
    }
}

module.exports = UsersModel;