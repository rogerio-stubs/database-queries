import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User[]> {
    const user = await this.repository.find({
      relations: ['games'],
      loadRelationIds: true,
      where: {
        id: user_id
      }
    })
    console.log(user);
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM USERS ORDER DESC first_name`); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const fullName = first_name + last_name;
    return this.repository.query(
      `SELECT * FROM USERS WHERE ILIKE '%${fullName}%'`
    ); 
  }
}
