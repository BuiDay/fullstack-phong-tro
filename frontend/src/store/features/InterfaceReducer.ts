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
  prices:any[],
  areas:any[],
  provinces:any[],
  isLoading:boolean
}

export interface IAuthRegister{
  name?:string,
  phone?:string,
  password?:string
}

export interface IAuthLogin{
  phone?:string,
  password?:string
}

export interface IPost{
  posts?: any[],
  msg?:string,
  count?:number,
  newPosts?: any[],
  isLoading?:boolean
}

export interface IPostPayload{
  err?:string,
  msg?:string,
  response?:{
    count?:number,
    rows?:object[]
  }
}

export interface IAppPayload{
  msg?:string,
  response:object[]
}

export interface IUser{
  currentData:{
    id?:string,
    name?:string,
    phone?:string,
    zalo?:string,
    fbUrl?:string,
    avatar?:string,
  }
}



export interface IUserPayload{
  err:string,
  msg:string,
  response:{},
}