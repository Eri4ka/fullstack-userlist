export enum Methods {
  get = 'GET',
  post = 'POST', 
  put = 'PUT', 
  delete = 'DELETE'
}

type TArgs = { url: string, method?: Methods, headers?: HeadersInit, body?: BodyInit }

type TRequest = <T>({...args}: TArgs) => Promise<T>

export const request: TRequest = async ({ url, method = Methods.get, headers, body }: TArgs) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, { method, headers, body });
  const responseData = await response.json();
  return responseData;
};