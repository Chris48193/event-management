<template>
    <div class="container">
        <div class="row">
            <div class="col offset-lg-3 col-lg-6 text-center">
                <h1>Bienvenu sur le système de gestion des invités du mariage de Géraldine et Germain</h1>
                <br>
                <router-link v-if="!isLoggedIn" class="btn btn-large btn-success" to="/login">Connection</router-link>
                <router-link v-else class="btn btn-large btn-success" to="/list">Commencer</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    }
}

</script>

<style scoped>
    .row {
        display: flex;
        height: 60vh;
        align-items: center;
    }
</style>