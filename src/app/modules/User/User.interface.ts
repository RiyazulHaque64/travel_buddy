export interface IUserInput {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
}
