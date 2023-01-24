<template>
    <div>
        <input type="text" v-model="input" placeholder="user" required>
        <button @click="login">Log In</button><br>
        <p>{{ errUser }}</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            errUser:""
        };
    },
    methods:{
        login(){
            this.axios.get("http://34.82.81.113:3000/students/name/"+this.input).then((res)=>{
                if ((res.data === null) || (res.data.name == "CastError")) {
                    this.errUser = "There are no user with this name"
                    return
                }
                this.errUser = ""
                this.$store.commit("setUser", res.data)
                this.$router.push("/")
            })
        }
    }
}
</script>

<style>

</style>