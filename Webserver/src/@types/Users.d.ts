interface UserInsertDO {
    username: string,
    userHash: string,
    password: string,
}

type UserSearchType = 'ID' | 'ReadID' | 'Username';