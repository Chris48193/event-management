<template>
    <div class="container">
        <base-dialog :show="!!error" title="Une erreur est survenue"  @close="handleError">
            {{ error }}
        </base-dialog>
        <base-dialog :show="isLoadingGuests" title="Veillez patienter svp..."  @close="handleError">
            <base-spinner></base-spinner>
        </base-dialog>
        <div class="row">
            <div class="col text-center">
                <h1>Ajouter des invités</h1>
                <hr class="mt-3" style="width: 50%; margin-left: 25% !important; margin-right: 25% !important;">
                <input class="form-control" type="text" style="color: #003f11" placeholder="Recherche des invités" aria-label=".form-control-lg Recherche" @input="updateSearch($event)">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="container">
            <div class="col mt-3">
                <table class="table table-hover"  style="color: #003f11 !important">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Block</th>
                            <th scope="col">Table</th>
                            <th scope="col">Chaise</th>
                            <th scope="col">Protocol d'accueil</th>
                            <th scope="col">Hôtesse service</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(guest, index) in filteredGuests" :key="guest.id">
                            <td>{{ index + 1 }}</td>
                            <td><input type="text" class="form-control" v-model="guest.name" @change="modifyGuest($event, 'name', guest.id)"></td>
                            <td><input type="text" class="form-control" v-model="guest.block" @change="modifyGuest($event, 'block', guest.id)"></td>
                            <td><input type="text" class="form-control" v-model="guest.table" @change="modifyGuest($event, 'table', guest.id)"></td>
                            <td><input type="text" class="form-control" v-model="guest.chair" @change="modifyGuest($event, 'chair', guest.id)"></td>
                            <td><input type="text" class="form-control" v-model="guest.checkPoint" @change="modifyGuest($event, 'checkPoint', guest.id)"></td>
                            <td><input type="text" class="form-control" v-model="guest.service" @change="modifyGuest($event, 'service', guest.id)"></td>
                            <td class="text-center"><button class="btn btn-danger" @click="deleteGuest(guest)">Delete</button></td>
                        </tr>
                        <tr>
                            <td>{{ filteredGuests.length + 1 }}</td>
                            <td><input type="text" class="form-control" v-model="name" @change="saveGuest()"></td>
                            <td><input type="text" class="form-control" v-model="block" @change="saveGuest()"></td>
                            <td><input type="text" class="form-control" v-model="table" @change="saveGuest()"></td>
                            <td><input type="text" class="form-control" v-model="chair" @change="saveGuest()"></td>
                            <td><input type="text" class="form-control" v-model="checkPoint" @change="saveGuest()"></td>
                            <td><input type="text" class="form-control" v-model="service" @change="saveGuest()"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                error: false,
                block: '',
                table: '',
                chair: '',
                checkPoint: '',
                service: '',
                search: '',
                isLoading: false,
                isLoadingGuests: false,
            }
        },
        methods: {
            updateSearch(event) {
                this.search = event.target.value;
            },
            async modifyGuest(event, field, guestId) {
                const fieldValue = event.target.value;

                var data = [{
                    id: guestId,
                    field: field,
                    value: fieldValue
                }]

                this.isLoading = true
                    try {
                        await this.$store.dispatch('guests/updateGuests', data);
                    } catch(error) {
                        this.error = error.message || 'Une erreur est survenue';
                    }
                this.isLoading = false
            },
            async saveGuest() {
                var data = {
                    id: this.newId,
                    name: this.name, 
                    arrived: false, 
                    time: '',
                    block: this.block,
                    table: this.table,
                    chair: this.chair,
                    checkPoint: this.checkPoint,
                    service: this.service
                }
                // this.guests.push(data)
                this.isLoading = true
                try {
                    await this.$store.dispatch('guests/saveGuest', data);
                } catch(error) {
                    this.error = error.message || 'Une erreur est survenue';
                }
                this.isLoading = false

                this.name = ""
                this.block=  ""
                this.table=  ""
                this.chair=  ""
                this.checkPoint = ""
                this.service = ""
            },
            async loadGuests() {
                this.isLoadingGuests = true
                try {
                    await this.$store.dispatch('guests/loadGuests'); // Since dispatch hier uses a promise, we can use async on this function and await on this instruction to the program to wait for this response
                } catch(error) {
                    this.error = error.message || 'Une erreur est survenue'; // The || operator hier gives an alternative value in case the first value is not correct
                }
                this.isLoadingGuests = false
            },
            async deleteGuest(guest) {
                var guestId = guest.id;
                this.isLoading = true;
                try {
                    await this.$store.dispatch('guests/deleteGuest', guestId);
                } catch(error) {
                    this.error = error.message || 'Une erreur est survenue';
                }

                this.isLoading = false

                // this.$store.dispatch('guests/deleteGuest', guestId)
                this.loadGuests();
            },
    
            handleError() {
                this.error = false;
            }
        },
        created() {
            this.loadGuests();
        },
        computed: {
            newId() {
                var millisencond = Date.now();
                var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                var strLen = Math.floor(Math.random() * 50)
                var id = millisencond + alpha.slice(strLen)
                return id;
            },
            filteredGuests() {
                var self = this
                var guests = self.$store.getters['guests/guests']
                var filteredGuests = guests.filter(guest => {
                    let searchRegex = new RegExp(self.search, 'i')
                    if (searchRegex.test(guest.name)) {
                        return true
                    }
                })
                return filteredGuests;
            }
        }
    }
</script>

<style scoped>
input {
    color:#003f11 !important;
}
</style>