export interface IAuth{
    isLoggedIn?: boolean,
    token?:string,
    msg?:string,
    isError?:boolean,
    isLoading?:boolean,
    isSuccess?:boolean,
    _persist?:object
}

export interface Iapp{
  msg?:string,
  categories?:any[],
}

export interface IAuthAction {
    type: string
    auth: IAuth
  }


  export interface IAuthState {
    auths: IAuth[]
  }
  