const general = require('../utils/general');
class StudentModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            },
            studentid: {
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
            dob: {
                type: DataTypes.DATE,
                allowNull: true
            },
            gender: {
                type: DataTypes.STRING(11),
                allowNull: true
            },
            isactive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            modelName: "student",
            sequelize
        });
    }

    static associate(models) {
        // this.myAssociation = models.student.hasMany(models.studentSubject, { foreignKey: 'studentid', as: 'students' });
        this.myAssociation = models.student.belongsToMany(models.subject, {
            foreignKey: 'studentid',
            as: 'subjects',
            through: { model: models.studentSubject }
        });
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

module.exports = StudentModel;