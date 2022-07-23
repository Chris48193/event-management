<template>
    <base-dialog :show="!!error" title="Une erreur est survenue"  @close="handleError">
        {{ error }}
    </base-dialog>
    <base-dialog :show="isLoadingGuests" title="Veillez patienter svp..."  @close="handleError">
        <base-spinner></base-spinner>
    </base-dialog>
    <div class="row">
        <div class="col text-center">
            <h1>Liste des invités</h1>
            <hr class="mt-3" style="width: 50%; margin-left: 25% !important; margin-right: 25% !important;">
        </div>
    </div>
    <div class="row">
        <div class="col offset-md-3 col-md-6">
            <div class="row">
                <div class="col text-center">
                    <h1 style="display: inline;">{{ filteredGuests.length }}/</h1><h5 style="display: inline">{{ guests.length }}</h5>
                    <h6>Invités</h6>
                </div>
                <div class="col text-center">
                    <base-spinner v-if="isLoading"></base-spinner>
                </div>
                <div class="col text-center">
                    <h1 style="display: inline;">{{ numberArrivedGuests }}/</h1><h5 style="display: inline">{{ guests.length }}</h5>
                    <h6>Invités arrivé(e)s</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-1 col-md-3"></div>
        <div class="col-10 col-md-6 text-center mt-3">
            <input class="form-control" type="text" style="color: #003f11" placeholder="Recherche des invités" aria-label=".form-control-lg Recherche" @input="updateSearch($event)">
        </div>
        <div class="col-1 col-md-3 text-left mt-3">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg> -->
        </div>
    </div>
    <div class="row">
        <div class="container-fluid">
            <div class="col mt-3">
                <div class="d-none d-lg-block">
                    <table class="table" style="color: #003f11 !important">
                        <thead>
                            <tr>
                                <!-- <th scope="col" width="2%">Check</th> -->
                                <th scope="col">Nom</th>
                                <th class="d-none d-lg-table-cell" scope="col">Block</th>
                                <th class="d-none d-lg-table-cell" scope="col">Table</th>
                                <th class="d-none d-lg-table-cell" scope="col">Chaise</th>
                                <th class="d-none d-lg-table-cell" scope="col">Protocol d'accueil</th>
                                <th class="d-none d-lg-table-cell" scope="col">Hôtesse service</th>
                                <th scope="col">Est arrivé(e)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="guest in filteredGuests" :key="guest.id" @click="assignTime(guest)" :class="guest.arrived ? 'bg-success text-white' : ''">
                                <!-- <td><input type="checkbox" :id="guest.id" v-model="guest.arrived" class="me-3"></td> -->
                                <td>{{ guest.name }}</td>
                                <td class="d-none d-lg-table-cell">{{ guest.block }}</td>
                                <td class="d-none d-lg-table-cell">{{ guest.table }}</td>
                                <td class="d-none d-lg-table-cell">{{ guest.chair }}</td>
                                <td class="d-none d-lg-table-cell">{{ guest.checkPoint }}</td>
                                <td class="d-none d-lg-table-cell">{{ guest.service }}</td>
                                <td>{{ guest.arrived ? "Arrivé(e) à " + guest.time : "Pas arrivé(e)" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-lg-none">
                    <div class="accordion" id="guests">
                        <div class="accordion-item" v-for="guest in filteredGuests" :key="guest.id">
                            <h2 class="accordion-header" :id="'heading' + guest.id">
                            <button :class="guest.arrived ? 'bg-success text-white' : ''" style="color:#003f11" class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + guest.id">
                                {{ guest.name }}
                            </button>
                            </h2>
                            <div :id="'collapse' + guest.id" class="accordion-collapse collapse" data-bs-parent="#guests">
                            <div class="accordion-body">
                                <button @click="assignTime(guest)" class="btn timeButton" :class="guest.arrived ? 'btn-danger' : 'btn-success'">{{ guest.arrived ? "Annuler l'arrivée" : "Valider l'arrivée" }}</button>
                                <br/>
                                <ul>
                                    <li>Block: {{ guest.block }}</li>
                                    <li>Table: {{ guest.table }}</li>
                                    <li>Chaise: {{ guest.chair }}</li>
                                    <li>Protocol d'accueil: {{ guest.checkPoint }}</li>
                                    <li>Hôtesse service: {{ guest.service }}</li>
                                    <li>Est arrivé(e): {{ guest.arrived ? "Arrivé(e) à " + guest.time : "Pas arrivé(e)" }}</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                isLoading: false,
                isLoadingGuests: false,
                error: false
            }
        },
        methods: {
            updateSearch(event) {
                this.search = event.target.value;
            },
            async assignTime(guest) {
                guest.arrived = !guest.arrived;
                var timeNow;
                var protocol;
                if (guest.arrived) {
                    const d = new Date();
                    var minutes = d.getMinutes();
                    minutes = minutes.toString()
                    if(minutes.length == 1) {
                        minutes = "0"+minutes
                    }
                    timeNow = d.getHours() + ":" + minutes;
                    guest.time = timeNow;
                    
                    protocol = this.$store.getters['name']
                } else {
                    timeNow = "";
                    protocol = ""
                }

                // Update time and if arrived in Database
                var data = [
                    {
                        id: guest.id,
                        field: "arrived",
                        value: guest.arrived
                    },
                    {
                        id: guest.id,
                        field: "time",
                        value: timeNow
                    },
                    {
                        id: guest.id,
                        field: "checkPoint",
                        value: protocol
                    }
                ]
                this.isLoading = true;
                try {
                    await this.$store.dispatch('guests/updateGuests', data);
                } catch(err) {
                    this.error = err.message || 'Une erreur est survenue';
                }
                this.isLoading = false;

                this.loadGuests();
            },
            arrivedGuests() {
                return this.guests.filter(guest => {
                    if(guest.arrived) {
                        return true;
                    }
                })
            },
            async loadGuests() {
                this.isLoadingGuests = true;
                try {
                    await this.$store.dispatch('guests/loadGuests'); // Since dispatch hier uses a promise, we can use async on this function and await on this instruction to the program to wait for this response
                } catch(error) {
                    this.error = error.message || 'Une erreur est survenue'; // The || operator hier gives an alternative value in case the first value is not correct
                    console.log(error)
                }
                this.isLoadingGuests = false;
            },
    
            handleError() {
                this.error = false;
            }
        },
        created() {
            this.loadGuests();
        },
        computed: {
            guests() {
                return this.$store.getters['guests/guests']
            },
            numberArrivedGuests() {
                var arrivedGuests = this.arrivedGuests()

                return arrivedGuests.length;
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
                return filteredGuests.sort((a, b) => {
                    if(a.name > b.name) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #guests {
        color: #003f11 !important;
    }
    .timeButton {
        float: right;
    }
</style>