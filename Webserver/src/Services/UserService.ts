import { getConnection, Repository } from 'typeorm';
import User from '../Models/User';
import {userHash, passwordHash} from '../Helpers/auth/Hasher';

export default class UserService {
    private repository: Repository<User>;
    constructor() {
        this.repository = getConnection().getRepository(User);
    }
 
  async insert(userDetails: UserInsertDO) {
    const UserHash = userHash(userDetails.username);
    let password = null;
    if(userDetails.password) {
      password = passwordHash(UserHash, userDetails.password)
    }
    const newuser = this.repository.create({
      ...userDetails,
      password,
      userHash: UserHash
    });
    await this.repository.save(newuser);
    return newuser;
  }

  async validateUser(User, UserPayload) {
    const comparePW = passwordHash(User.userHash, UserPayload.password);
    if(comparePW === User.password) {
      return {
        id: User.id,
        readableId: User.readable_id
      }
    }
    return false;
  }


  async find(id, type : UserSearchType = 'Username') {
    let searchKey = 'username';
    return await this.repository.findOne({where: {[searchKey]: id}});
  }

  async delete(id) {
    await this.repository.delete(id);
  }

  repo() {
    return this.repository;
  }
}
 