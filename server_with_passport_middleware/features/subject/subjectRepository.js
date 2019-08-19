const { sequelize, subject, studentSubject } = require('../../model/index');

class studentRepository {
    static async getAll(request, response, next) {
        try {
            const result = await subject.findAll();
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async get(request, response, next) {
        try {
            const result = await subject.findOne()
            response.status(200).json(result.data);
        } catch (error) {
            next(error);
        }
    }

    static async create(request, response, next) {
        try {
            // const subjectData = {
            //     "subjectname": "maths",
            //     "creditpoint": 10
            // };
            let subjectData = request.body;
            const result = await subject.create(subjectData);
            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async update(request, response, next) {
        try {
            const subjectData = request.body;
            const subjectId = request.params.id;
            const result = await subject.update(subjectData, {
                where: {
                    subjectid: subjectId
                }
            })
            response.status(200).json({ message: "successful" });
        } catch (error) {
            next(error);
        }
    }

    static async remove(request, response, next) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const subjectId = request.params.id;
            const countResult = await studentSubject.count({
                where: {
                    status: 2,
                    subjectid: subjectId
                }
            });
            if (countResult == 0) {
                const inactiveresult = studentSubject.update({
                    status: 3
                }, {
                    where: {
                        subjectid: subjectId
                    }
                }, transaction);
                const result = await subject.update({
                    isactive: false
                }, {
                    where: {
                        subjectid: subjectId
                    }
                }, transaction);
                transaction.commit();
                response.status(200).json({ message: "successful" });
            } else {
                transaction.rollback();
                response.status(401).json({ message: "Not possible" });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = studentRepository;