export interface IUser {
  id: number,
  name: string
}
enum TStatus {
  success = 'success',
  error = 'error'
}

export interface IUserErrorResponse {
  status: TStatus.error,
  message: string
}

export interface IAllUsersResponse {
  status: TStatus.success,
  data: IUser[]
}

export interface ICreateUserResponse {
  status: TStatus.success,
  data: IUser
}

export interface IEditUserResponse {
  status: TStatus.success,
  data: IUser
}

export interface IDeleteUserResponse {
  status: TStatus.success,
  data: IUser['id']
}