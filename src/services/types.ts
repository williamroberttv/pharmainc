import {ReactNode} from 'react'

// Type Users
export type UsersDataProps = {
  name: {
    first: string;
    last: string;
  },
  location:{
    street: string;
    city: string;
    country: string;
  }
  email: string;
  gender: string;
  login: {
    username: string;
  },
  dob: {
    date: string;
    age: string;
  },
  phone: string;
  cell: string;
  nat: string;
  picture:{
    large: string;
  }
}

//Context Types
export type ListUsersContextProps = {
  usersData: UsersDataProps[];
  openModal: boolean;
  getUsersData: (params: UsersDataProps[]) => void;
  handleModal: (param: boolean) => void;
}

export type ListUsersProviderProps = {
  children: ReactNode;
}