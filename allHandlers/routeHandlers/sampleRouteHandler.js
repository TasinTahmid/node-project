module.exports = function sample(reqProps, cb) {
    console.log('in',reqProps)
    cb(200, {
        message: 'This is a sample Route only.'
    });
}

