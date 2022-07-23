<template>
    <header>
        <base-dialog :show="!!error" title="Une erreur est survenue"  @close="handleError">
            {{ error }}
        </base-dialog>
        <base-dialog :show="isLoading" title="Veillez patienter svp..."  @close="handleError">
            <base-spinner></base-spinner>
        </base-dialog>
        <nav class="container navbar navbar-expand-lg navbar-light px-3 py-4">
            <router-link class="navbar-brand" to="/">
                <img src="../../assets/logo.png" alt="" height="50">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <!-- <a class="nav-link active d-md-inline d-sm-none" aria-current="page" href="#">Acceuil</a> -->
                        <router-link v-if="isLoggedIn" class="nav-link d-md-inline d-sm-none" aria-current="page" to="/list">Liste des invités</router-link>
                    </li>
                    <li class="nav-item d-none d-md-inline">
                        <!-- <a class="nav-link active d-md-inline d-sm-none" aria-current="page" href="./addGuest.html">Ajouter des invités</a> -->
                        <router-link v-if="isLoggedIn" class="nav-link d-lg-inline d-sm-none" aria-current="page" to="/add">Ajouter des invités</router-link>
                    </li>
                </ul>
                <div class="d-flex">
                    <button v-if="isLoggedIn" class="btn btn-success me-2" @click="reload">Actualiser</button>
                    <router-link v-if="!isLoggedIn" class="btn btn-outline-success" to="/login">Login</router-link>
                    <button v-else class="btn btn-outline-success" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            error: '',
            isLoading: false
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.replace('/');
        },
        async reload() {
            this.isLoading = true
            try {
                await this.$store.dispatch('guests/loadGuests'); // Since dispatch hier uses a promise, we can use async on this function and await on this instruction to the program to wait for this response
            } catch(error) {
                this.error = error.message || 'Une erreur est survenue'; // The || operator hier gives an alternative value in case the first value is not correct
            }
            this.isLoading = false
        },
        handleError() {
            this.error = false;
        }
    }
}

</script>

<style scoped>
    .nav-link {
        font-weight: 600;
        font-size: large;
        color: #003f11 !important;
    }
    .nav-link:hover {
        color: rgba(0, 63, 17, 0.8) !important;
    }
</style>