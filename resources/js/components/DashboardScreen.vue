<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>LaraVueCRUD</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
            <v-icon @click="() => logout()">mdi-logout</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="container-page mt-5">
            <h3 class="ml-3">Profile</h3>
            <v-text-field 
                label="Username" 
                class="margin-field" 
                hide-details="auto" 
                filled
                :rules="rulesname"
                :value="userName"
                @input="_=>userName=_"
            ></v-text-field>
            <v-text-field 
                label="Email" 
                class="margin-field mt-5" 
                hide-details="auto" 
                filled
                :rules="rulesemail"
                :value="userEmail"
                @input="_=>userEmail=_"
            ></v-text-field>
            <div class="btn-center mt-10">
                <v-btn color="primary" block @click="() => save()">
                    Save
                    <v-icon right dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" large block rounded outlined class="mt-10" @click="() => deleteprofile()">
                    Delete
                    <v-icon right dark>mdi-delete</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted() {
        var token = this.$cookie.get('token');
        if (!token) {
            this.$router.push('/login');
        }
        const getProfile = async() => {
            var token = this.$cookie.get('token');
            await axios.post('http://localhost:8080/api/user/profile', {
                token
            })
            .then(res => {
                console.log('success: ', res.data.message);
                this.userName = res.data.user.name;
                this.userEmail = res.data.user.email;
            }).catch(err => console.log(err.message));
        }
        getProfile();
    },
    data: () => ({
        userName: '',
        userEmail: '',
        rulesname: [
            value => !!value || 'Required.',
        ],
        rulesemail: [
            value => !!value || 'Required.',
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        ]
    }),
    methods: {
        logout: function() {
            this.$cookie.delete('token');
            var token = this.$cookie.get('token');
            if (!token) {
                this.$router.push('/login');
            }
        },
        save: async function() {
            var name = this.userName;
            var email = this.userEmail;
            var token = this.$cookie.get('token');
            await axios.post('http://localhost:8080/api/user/update', {
                name,
                email,
                token
            }).then(res => {
                console.log('success: ', res.data.message);
            }).catch(err => console.log(err.message));
        },
        deleteprofile: async function() {
            var token = this.$cookie.get('token');
            await axios.post('http://localhost:8080/api/user/delete', {
                token
            }).then(res => {
                console.log('success: ', res.data.message);
                this.$cookie.delete('token');
                this.$router.push('/login');
            }).catch(err => console.log(err.message));
        }
    }
}
</script>
<style scoped>
.container-page {
    padding: 20px;
    justify-self: center;
    width: 40vw;
    margin-left: auto;
    margin-right: auto;
}
.btn-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>