export interface ICreateUser {
  username: string;
  password: string;
  name: string;
}

export interface IUser extends ICreateUser {
  id: string;
  password: string;
  registeredAt: Date;
}

export type IUserDto = IUser & {
  password: undefined;
};
