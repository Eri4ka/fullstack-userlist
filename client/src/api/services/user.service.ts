import { 
  IUser, 
  IAllUsersResponse, 
  IUserErrorResponse, 
  ICreateUserResponse, 
  IDeleteUserResponse,
  IEditUserResponse 
} from '@/apptypes/index';
import { request, Methods } from '../request';

class UserService {
  async getAllUsers() {
    const responseData = await request<IAllUsersResponse | IUserErrorResponse>({ url: 'user' });
    return responseData;
  }

  async createUser(body: Omit<IUser, 'id'>) {
    const responseData = await request<ICreateUserResponse | IUserErrorResponse>({ 
      url: 'user',
      method: Methods.post,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return responseData;
  }

  async deleteUser(userId: IUser['id']) {
    const responseData = await request<IDeleteUserResponse | IUserErrorResponse>({ 
      url: `user/${userId}`, 
      method: Methods.delete 
    });
    return responseData;
  }

  async editUser(body: IUser) {
    const responseData = await request<IEditUserResponse | IUserErrorResponse>({
      url: 'user',
      method: Methods.put,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return responseData;
  }

  async searchUser(q: string) {
    const responseData = await request<IAllUsersResponse | IUserErrorResponse>({ url: `user?q=${q}` });
    return responseData;
  }
}

export default new UserService();