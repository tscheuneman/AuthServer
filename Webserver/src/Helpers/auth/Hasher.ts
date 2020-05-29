import Hash from 'sha.js';
export const userHash = (username) => {
    return Hash('sha256').update(process.env.BASE_HASH + username + Date.now()).digest('hex');
}

export const passwordHash = (userHash, password) => {
    return Hash('sha512').update(process.env.BASE_HASH + password + userHash).digest('hex');
}