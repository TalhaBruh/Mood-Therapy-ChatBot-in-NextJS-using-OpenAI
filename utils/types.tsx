export type SelectFieldType = {
  values: string[];
};

export type InputFieldType = {
  name: string;
  type: string;
};

export enum InputTypeEnum {
  text = "text",
  email = "email",
  password = "password",
  date = "date",
}

export enum SelectTypeEnum {
  Male = "male",
  Female = "female",
}

export type UserType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  birth: string;
  gender: string;
  mood: string;
  session: number;
  gptResponse: string;
};

export type UserLoginType = {
  userName: string;
  password: string;
};

export type UserUpdateType = {
  userName: string;
  mood: string;
  session: number;
  gptResponse: string;
};

export type sessionRatingType = {
  userName: string;
  rating: number;
  review: string;
};
