const moment = require('moment');
const uuid = require('uuid');

class General {
    static getDateNow() {
        return moment().toISOString();
    }

    static toDBFormat(momentDate) {
        return moment(momentDate).format('YYYY-MM-DD HH:mm');
    }

    static toDBFormatWithSeconds(momentDate) {
        return moment(momentDate).format('YYYY-MM-DD HH:mm:ss');
    }

    static genUUID() {
        return uuid.v4().toUpperCase();
    }
}

module.exports = General;