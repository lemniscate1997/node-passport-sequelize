const router = express.Router();
const validator = require('express-joi-validator');

const { idSchema } = require('../../utils/schema');
const SubjectController = require('./subjectRepository');

router.route('/getAll').get(SubjectController.getAll);
router.route('/get/:id').get(validator(idSchema), SubjectController.get);
router.route('/create').post(SubjectController.create);
router.route('/update/:id').put(SubjectController.update);
router.route('/remove/:id').delete(SubjectController.remove);

module.exports = router;