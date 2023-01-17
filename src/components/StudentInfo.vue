<template>

    <div class="container">
        <div class="student">
            <img :src="student.photo" width = "100" @click="isOpen=true">
            <h3>{{student.name}}</h3>
            <h4>{{student.group}}</h4>
            <h5>Завдання {{isDonePrOfStudent}}</h5>
        
            <Modal :open="isOpen" @close="isOpen = !isOpen">
                <img :src="student.photo" @click="isOpen= true"><br>
                <h2> {{student.name}}</h2><br>
            </Modal>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import Modal from "./Modal.vue";
import { ref } from "vue";
export default {
    components: { Modal },
    props: {
           id: '',
       },
    data(){
        return{
            student:{},
            isOpen: false,
        };
    },
    mounted(){
        axios.get("http://34.82.81.113:3000/students/"+this.id).then((res)=>{
            this.student = res.data;
        });
    },
    computed: {
        // a computed getter
        isDonePrOfStudent() {
            return this.student.isDonePr ? 'здана' : 'не здана'
        },
    },
    setup() {
        const isOpen = ref(false);
        return { isOpen };
    },
}
</script> 

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .student{
        width:500px;
        background-color:wheat;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        border: 5px dashed rebeccapurple;
        border-radius:20px;
    }
    img{
        max-width: 100%;
        max-height: 100%;
    }

</style>