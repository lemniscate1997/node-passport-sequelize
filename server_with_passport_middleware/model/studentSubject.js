class StudentSubjectModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            studentsubjectid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1 // 1: inProgress, 2: completed, 3: deleted
            }
        }, {
            modelName: "studentsubject",
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = models.studentSubject.belongsTo(models.student, { foreignKey: 'studentid', as: 'students' });
        this.myAssociation = models.studentSubject.belongsTo(models.subject, { foreignKey: 'subjectid', as: 'subjects' });
    }
}

module.exports = StudentSubjectModel;