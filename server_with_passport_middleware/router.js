const student = require('./features/student/studentApi');
const subject = require('./features/subject/subjectApi');

require('./utils/auth');

app.all('*', (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(404).json({ message: 'Unauthorized request' });
    }
});

app.use('/student', student);
app.use('/subject', subject);