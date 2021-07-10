const auth = store => next => action=> {
    if (localStorage.token && !store.getState().currentUser.user?.id) {
        console.log(store.getState().currentUser.user?.id);
    }
    return next(action);
}


export default auth;