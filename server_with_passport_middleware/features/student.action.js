const axios = require('axios');
const { student, subject, studentSubject } = require('../model/index');

const getAll = async(request, response, next) => {
    try {
        // const result = await axios.get('http://localhost:3000/student');
        // console.log(result.data);
        const result = await student.findAll({
            include: [{
                model: subject,
                as: 'subjects',
                through: {
                    model: studentSubject,
                    as: 'students',
                    attributes: []
                }
            }]
        });
        response.status(200).json(result);
        // response.status(200).json(result.data);
    } catch (error) {
        console.log("----------" + error);
        response.status(401).json({ message: error.error });
    }
}

const get = async(request, response, next) => {
    try {
        // const result = await axios.get(`http://localhost:3000/student/${request.params.id}`);
        // response.status(200).json(result.data);
        const result = await student.findOne()
        response.status(200).json(result.data);
    } catch (error) {
        response.status(401).json({ message: error.error });
    }
}

const create = async(request, response, next) => {
    try {
        // const studentData = {
        //     "firstname": "Nishta",
        //     "lastname": "Patel",
        //     "dob": "01-07-1998",
        //     "gender": "female"
        // };
        const subjectData = {
            "subjectname": "maths",
            "creditpoint": 10
        };
        const studentData = request.body;
        // const result = await axios.post('http://localhost:3000/student', studentData);
        const res = await student.create(studentData);
        const res1 = await subject.create(subjectData);
        const res2 = await studentSubject.create({
            studentid: res.dataValues.studentid,
            subjectid: res1.dataValues.subjectid
        })

        response.status(200).json({ message: "successful" });
    } catch (error) {
        console.log(error);
        response.status(401).json({ message: error.error });
    }
}

const update = async(request, response, next) => {
    try {
        const student = request.body;
        const result = await axios.put(`http://localhost:3000/student/${request.params.id}`, student);
        response.status(200).json({ message: "successful" });
    } catch (error) {
        response.status(401).json({ message: error.error });
    }
}

const remove = async(request, response, next) => {
    try {
        const result = await axios.put(`http://localhost:3000/student/${request.params.id}`);
        response.status(200).json({ message: "successful" });
    } catch (error) {
        response.status(401).json({ message: error.error });
    }
}

module.exports = {
    get,
    getAll,
    create,
    update,
    remove
};