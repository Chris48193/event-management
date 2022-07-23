<template>
    <section class="vh-100">
        <base-dialog :show="!!error" title="Une erreur est survenue"  @close="handleError">
            {{ error }}
        </base-dialog>
        <base-dialog :show="isLoading" title="Veillez patienter svp..."  @close="handleError">
            <base-spinner></base-spinner>
        </base-dialog>
        <div class="container py-5">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                    alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5">

                                    <form @submit.prevent="submitForm">

                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <span class="h1 fw-bold mb-0">G&G</span>
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Veillez vous connecter</h5>

                                        <div class="form-outline mb-4">
                                            <input type="email" required id="form2Example17"
                                                class="form-control form-control-lg" v-model.trim="email"/>
                                            <label class="form-label" for="form2Example17">Adresse E-Mail</label>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <input type="password" required id="form2Example27"
                                                class="form-control form-control-lg" v-model.trim="password"/>
                                            <label class="form-label" for="form2Example27">Mot de passe</label>
                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-success btn-lg btn-block" type="submit">Login</button>
                                        </div>

                                        <a class="small text-muted" href="#">Forgot password?</a>
                                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Ask a new one to the Admin</p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            isLoading: false,
            error: false
        };
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === "" || !this.email.includes("@") || this.password.length < 6) {
                this.formIsValid = false;
                // return;
            }
            this.isLoading = true;
            const actionPayload = {
                email: this.email,
                password: this.password
            };
            try {
                await this.$store.dispatch("login", actionPayload);
                this.isLoading = false;
                this.$router.replace("/list");
            }
            catch (err) {
                this.error = err.message || "Failed to authenticate, try later.";
                this.isLoading = false;
            }
        },
        handleError() {
            this.error = false;
        }
    },
}
</script>

<style scoped>
    .card {
        background-color: rgba(240, 213, 162, 0.2);
        color: #003f11 !important;
    }

    input {
        color: #003f11 !important;
    }
</style>