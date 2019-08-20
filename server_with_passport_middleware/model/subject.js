const general = require('../utils/general');
class SubjectModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            },
            subjectid: {
                type: DataTypes.UUID,
                allowNull: true,
                primaryKey: true,
                validate: {
                    isUUID: 4
                },
                defaultValue: () => general.genUUID()
            },
            subjectname: {
                type: DataTypes.STRING(25),
                allowNull: true,
                validate: {
                    max: 25
                }
            },
            creditpoint: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isactive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            modelName: "subject",
            sequelize
        });
    }

    static associate(models) {
        // this.myAssociation = models.subject.hasMany(models.studentSubject, { foreignKey: 'subjectid', as: 'subjects' });
        this.myAssociation = models.subject.belongsToMany(models.student, {
            foreignKey: 'subjectid',
            as: 'students',
            through: {
                model: models.studentSubject
            }
        });
    }
}

module.exports = SubjectModel;