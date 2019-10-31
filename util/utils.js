export const generateOTP= (x) => {
    // 463309364588305
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < (x || 15); i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return ''.concat(text);
};

export const validateParameters=(params, body, res) =>{


    let userData = body;
    //support json
    if (typeof userData === 'string' || userData instanceof String) {
        userData = JSON.parse(userData);
    }
    if (!params.every(arg => arg in userData && userData[arg]) ) {
        return res.status(400)
            .send({
                status: 'error',
                message: 'invalid request parameters',
                data: null,
            }).end();

    }
    return userData;
}
