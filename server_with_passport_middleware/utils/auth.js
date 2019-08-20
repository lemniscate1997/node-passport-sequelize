const passport = require('passport');
const userRepository = require('../features/user/userRepository');
const sessions = require('../middlewares/session');

app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            info = err;
        }
        if (info) {
            if (!info.message) {
                info.message = "No error message";
            }
            res.json({
                    status: 'FAILED',
                    msg: info.message
                })
                // return info;
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error("passport: authenticate - login failed. Error: ");
                return res.json({
                    status: 'FAILED',
                    msg: 'Login Failed'
                });
            }
            console.log(" user logged in");
            req.session.save(() => {
                res.json({
                    status: 'OK',
                    msg: 'Login Successful'
                });
            });
        });
    })(req, res, next);
});

app.post('/auth/logout', async(req, res) => {
    console.log(req.user);
    await sessions.logout(req, res);
    res.json({
        status: 200,
        msg: "Logout successful"
    });
});

app.post('/auth/signup', async(request, response) => {
    try {
        const user = request.body;
        await userRepository.createUser(user);
        response.status(200).json({
            message: "User created successfully"
        });
    } catch (error) {
        response.status(401).json({ message: "user creation failed" });
    }
});

app.get('/auth/login-status', (req, res) => {

    return res.json({
        auth_status: req.isAuthenticated()
    });
});