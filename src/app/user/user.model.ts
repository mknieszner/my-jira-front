import {TaskModel} from '../shared/table.model';

export class UserModel {
  public username: string;
  public firstName: string;
  public lastName: string;
  public passowrd: string;
  public email: string; // TODO: remove password from user details on Tickets!
  public enabled: boolean;
  public roleNames: any[];
  public taskDtos?: TaskModel[];
}
