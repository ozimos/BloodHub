exports.generateOTP= (x) => {
    // 463309364588305
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < (x || 15); i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return ''.concat(text);
};
