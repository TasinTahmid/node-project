module.exports = (reqProps, cb) => {

    console.log('in',reqProps)
    cb(500, {
        message: 'This is a errorr only.'
    });
}