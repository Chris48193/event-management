export default {
    saveGuest(state, payload) {
        state.guests.push(payload);
    },

    setGuests(state, payload) {

        state.guests = payload;
    },

    deleteGuest(state, payload) {
        state.guests = state.guests.filter(guest => {
            return guest.id != payload
        })
    }
};