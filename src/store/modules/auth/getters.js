export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    email(state) {
        return state.email;
    },
    name(state) {
        return state.name;
    },
    isAuthenticated(state) {
        return state.token != null;
    }
};