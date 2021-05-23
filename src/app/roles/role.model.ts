import {UserModel} from "../user/user.model";

export class RoleModel {
  public name: string;
  public id: number;
  public userDtos: UserModel[];
  public description: string;
}
