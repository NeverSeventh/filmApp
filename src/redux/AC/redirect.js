import { REDIRECT } from "../types"








const redirectActionCreator = (payload) => {
    return {type:REDIRECT,payload:payload}
}



export  {redirectActionCreator}