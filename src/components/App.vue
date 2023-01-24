<template>
   <div class="main" :class="this.$store.getters.getIsDark ? 'darkTheme' : 'lightTheme'">
       <button @click="logout">Log Out</button>
       <h1>Students</h1>
       <div class="theme">
            <h4> <label>Dark Theme <input type="checkbox" @click="this.$store.commit('setIsDark')" v-model="this.$store.getters.getIsDark"></label></h4>
           
        </div>
       <div class="content">
           <router-view></router-view>
       </div>
   </div>
</template>

<script>
export default {
    data(){

    },
    methods:{
        logout(){
            this.$store.commit("setUser", null)
            this.$router.push("/login")
        }
    }
}
</script>

<style>
    h1{
        text-align: center;
    }
    .lightTheme{
        background-color:wheat;
    }
    .darkTheme{
        background-color:rgb(163, 118, 208);
    }
   

    .main{
        width: 100%;
        height: 100vh;
    }
    .theme{
        position: absolute;
        right: 20px;
        top: 10px
    }
</style>
