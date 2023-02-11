import { User, Role } from "../../entity";
import { Connection } from "../../sqlite";


Connection.setOptions({
  entities: [User, Role],
});

export const UserRepository = Connection.getRepository(User).extend({
  async saveUser(u: User) {
    console.log(u);
    return await this.save(u);
  },
});

export const RoleRepository = Connection.getRepository(Role).extend({
  async saveRole(u: Role) {
    console.log(u);
    return await this.save(u);
  },
});
