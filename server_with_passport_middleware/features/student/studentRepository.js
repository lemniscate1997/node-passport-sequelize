const axios = require('axios');
const { sequelize, student, subject, studentSubject } = require('../../model/index');

class studentRepository {
    static async getAll(request, response, next) {
        try {
            // const result = await axios.get('http://localhost:3000/student');
            // response.status(200).json(result.data);
            const result = await student.findAll({
                include: [{
                    model: subject,
                    as: 'subjects',
                    attributes: ['subjectid', 'subjectname', 'creditpoint'],
                    through: {
                        model: studentSubject,
                        as: 'students',
                        attributes: []
                    }
                }]
            });
            response.status(200).json(result);
        } catch (error) {
            console.error("----------" + error);
            next(error);
        }
    }

    static async get(request, response, next) {
        try {
            // const result = await axios.get(`http://localhost:3000/student/${request.params.id}`);
            // response.status(200).json(result.data);
            const studentId = request.params.id;
            const result = await student.findOne({
                where: {
                    studentid: studentId
                },
                include: [{
                    model: subject,
                    as: 'subjects',
                    attributes: ['subjectid', 'subjectname', 'creditpoint'],
                    where: {
                        isactive: true
                    },
                    through: {
                        model: studentSubject,
                        as: 'students',
                        attributes: []
                    }
                }]
            })
            console.log("++++++" + result.getFullName());
            response.status(200).json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async create(request, response, next) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            // const studentData = {
            //     "firstname": "Nishta",
            //     "lastname": "Patel",
            //     "dob": "01-07-1998",
            //     "gender": "female",
            //     "isactive": true
            // };
            // const result = await axios.post('http://localhost:3000/student', studentData);
            let studentData = request.body;
            const result = await student.create(studentData, transaction);

            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async update(request, response, next) {
        try {
            const studentData = request.body;
            const studentId = request.params.id;
            // const result = await axios.put(`http://localhost:3000/student/${request.params.id}`, student);
            const result = await student.update(studentData, {
                where: {
                    studentid: studentId
                }
            });
            response.status(200).json({ message: "successful" });
        } catch (error) {
            next(error);
        }
    }

    static async remove(request, response, next) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const studentId = request.params.id;
            // const result = await axios.put(`http://localhost:3000/student/${request.params.id}`);
            const inactiveresult = studentSubject.update({
                status: 3
            }, {
                where: {
                    studentid: studentId,
                    status: 1
                }
            }, transaction);
            const result = await student.update({
                isactive: false
            }, {
                where: {
                    studentid: studentId
                }
            }, transaction);
            transaction.commit();
            response.status(200).json({ message: "successful" });
        } catch (error) {
            transaction.rollback();
            next(error);
        }
    }

    static async addSubject(request, response, next) {
        try {
            const { studentId, subjects } = request.body;
            let createData = subjects.map((row) => {
                return {
                    subjectid: row.subjectId,
                    studentid: studentId
                }
            });
            console.log(createData);
            const result = await studentSubject.bulkCreate(createData)
            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = studentRepository;