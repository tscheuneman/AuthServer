export const UserCreateSchema = {
    username: {
        key: 'username',
        type: 'string',
        maxLength: 255,
        required: true
    },
    email: {
        key: 'email',
        type: 'string',
        maxLength: 255,
        required: true
    },
    password: {
        key: 'password',
        type: 'string',
        maxLength: 255,
        required: true
    }
}

export const UserLoginSchema = {
    username: {
        key: 'username',
        type: 'string',
        maxLength: 255,
        required: true
    },
    password: {
        key: 'password',
        type: 'string',
        maxLength: 255,
        required: true
    }
}