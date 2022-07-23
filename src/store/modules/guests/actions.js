export default {
    async saveGuest(context, data) {
        
        const token = context.rootGetters.token;
        const guestData = {
            id: data.id,
            name: data.name,
            arrived: data.arrived,
            time: data.time,
            block: data.block,
            table: data.table,
            chair: data.chair,
            checkPoint: data.checkPoint,
            service: data.service,
        };

        const response = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/guests/${data.id}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(guestData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.error.message || 'Le nouveau invité n\'a pas pu être ajouté');
            throw error;
        }

        context.commit('saveGuest', guestData)
    },

    async loadGuests(context) {

        const token = context.rootGetters.token;
        const response = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/guests.json?auth=${token}`);

        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.error.message || 'Une erreur de connection est survenue');
            throw error;
        }

        const guests = [];

        for(const [key, data] of Object.entries(responseData)) {
            try {
                const guest = {
                id: key,
                name: data.name,
                arrived: data.arrived,
                time: data.time,
                block: data.block,
                table: data.table,
                chair: data.chair,
                checkPoint: data.checkPoint,
                service: data.service,
                };

                guests.push(guest);
            } catch(error) {
                console.log(error)
            }
        }

        context.commit('setGuests', guests)
    },

    async updateGuests(context, data) {

        const token = context.rootGetters.token;
        for(const updateDate of data) {

            const guestData = {}

            guestData[updateDate.field] = updateDate.value;

            const response = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/guests/${updateDate.id}.json?auth=${token}`, {
                method: 'PATCH',
                body: JSON.stringify(guestData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.error.message || "Les nouvelles données n'ont pas pu être ajoutées");
                throw error;
            }
        }
    },

    async deleteGuest(context, id) {

        const token = context.rootGetters.token;
        const response = await fetch(`https://invitation-management-7e5a5-default-rtdb.europe-west1.firebasedatabase.app/guests/${id}.json?auth=${token}`, {
            method: 'DELETE'
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.error.message || "Les données n'ont pas pu être supprimées");
            throw error;
        }
    },
};