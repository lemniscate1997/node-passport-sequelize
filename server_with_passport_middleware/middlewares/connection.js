const userRepository = require('../features/user/userRepository');
const general = require('../utils/general');

class Connection {
    constructor(username = null, password = null) {
        this.username = username;
        this.password = password;
    }

    async validateUser(request) {
        try {
            let user = await userRepository.getUserByEmailId(this.username);

            if (user && user.isactive) {
                const match = await user.comparePassword(this.password);
                if (match) {
                    console.log('Valid user : ', this.username);
                    /**
                     *  remove password from user object
                     */
                    user.password = undefined;
                    user.isactive = undefined;
                    return user;
                }
            }
            return false;
        } catch (error) {
            console.log('Error occured while login : ', error);
            throw error;
        }
    }
}

module.exports = Connection;