import { REDIRECT } from "../types"








const redirectActionCreator = (payload) => {
    return {action:REDIRECT,payload:payload}
}



export  {redirectActionCreator}