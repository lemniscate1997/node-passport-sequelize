const { users } = require('../../model/index');

class UserRepository {

    static async getUserByEmailId(emailId) {
        try {
            let result = await users.findOne({ email: emailId });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createUser(user) {
        try {
            let result = await users.build(user);
            await result.generateHash();
            result.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserRepository;