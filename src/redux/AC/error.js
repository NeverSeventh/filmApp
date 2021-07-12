const { ERROR, NO_ERROR } = require("../types")




const errorActionCreator = (payload) => {
    return {type:ERROR, payload:payload}
}


const noErrorActionCreator = (payload) => {
    return {type:NO_ERROR,payload:payload}
}



export  {
    errorActionCreator,noErrorActionCreator
}