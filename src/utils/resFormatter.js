module.exports = {
    success: (status, message, data) => {
        return {
            success: true,
            message: message,
            data: data
        }
    },
    fail: message => {
        return {
            success: false,
            message: message
        }
    },
};