const router = express.Router();
const validator = require('express-joi-validator');

const { idSchema } = require('../../utils/schema');
const StudentController = require('./studentRepository');

router.route('/getAll').get(StudentController.getAll);
router.route('/get/:id').get(validator(idSchema), StudentController.get);
router.route('/create').post(StudentController.create);
router.route('/addSubjects').post(StudentController.addSubject);
router.route('/update/:id').put(StudentController.update);
router.route('/remove/:id').delete(StudentController.remove);

module.exports = router;