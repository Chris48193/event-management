export default {
    async login(context, payload) {
        // Fetch login details
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmJa0TYgjcUl3hvdAtUnOj8qmXG_drlMc", {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.error.message || "Echec d'authentification. Veillez vérifier vos coordonnées");
            throw error;
        }

        // Fetch user data
        const responseUser = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/users/${responseData.localId}.json?auth=${responseData.idToken}`);

        const responseDataUser = await responseUser.json();

        if(!responseUser.ok) {
            console.log(responseDataUser);
            const error = new Error(responseDataUser.error.message || "Echec d'authentification. Veillez vérifier vos coordonnées");
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
            email: responseData.email,
            name: responseDataUser.name
        })
    },

    async getActualUser(_, data) {
        const response = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/users/${data.userId}.json?auth=${data.token}`);

        const responseData = await response.json();

        if(!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.error.message || "Echec d'authentification. Veillez vérifier vos coordonnées");
            throw error;
        }

        // console.log(responseData)

        const name = responseData.name;
        return name;
    },
    
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
            email: null,
            name: null
        })
    }
};