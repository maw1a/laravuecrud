<template>
    <div class="container">
        <v-card
            class="mx-auto"
            max-width="344"
            outlined
        >
            <v-card-title>LaravueCRUD</v-card-title>
            <div>
                <v-text-field 
                    label="Email" 
                    :rules="rulesemail" 
                    class="margin-field" 
                    hide-details="auto" 
                    filled
                    :value="userEmail"
                    @input="_=>userEmail=_"
                ></v-text-field>
                <v-text-field 
                    label="Password" 
                    :rules="rulespass" 
                    class="margin-field" 
                    hide-details="auto" 
                    filled
                    :value="userPassword"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                    @input="_=>userPassword=_"
                ></v-text-field>
            </div>
            <div class="lowertext">
                <p>Don't have an account? <router-link to="/register">Register</router-link></p>
                <v-btn color="primary" @click="() => login()">Login</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted() {
        var token = this.$cookie.get('token');
        if (token) {
            this.$router.push('/dashboard');
        }
    },
    data: () => ({
        userEmail: "",
        userPassword: "",
        value: true,
        rulesemail: [
            value => !!value || 'Required.',
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        ],
        rulespass: [
            value => !!value || 'Required.',
            value => value.length >= 8 || 'Minimum 8 characters'
        ],
    }),
    methods: {
        login: async function() {
            var email = this.userEmail;
            var password = this.userPassword;
            await axios.post('http://localhost:8080/api/user/login', {
                email,
                password
            }).then(res => {
                console.log('success: ', res.data.message);
                this.$cookie.set("token", res.data.token);
            }).catch(err => console.log(err.message));
            var token = this.$cookie.get('token');
            if (token) {
                this.$router.push('/dashboard');
            }
        }
    }
}
</script>

<style scoped>
    .margin-field {
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .lowertext {
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 10px;
        display: flex; 
        flex: 1;
        justify-content: space-between;
        flex-direction: row;
    }
</style>