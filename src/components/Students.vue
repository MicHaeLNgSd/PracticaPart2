<template>
    <div>
		<input type="text" name="search" v-model="search"><br>
		<table class="table table-dark">
			<tr v-for="item in students"  v-bind:key="item._id" :class="search != '' ? (item.name.includes(search) ? 'selected' : 'unselected') : 'unselected2'"> 
                <td v-if="this.editingId != item._id">
                    <router-link v-bind:to="'/student-info/'+item._id">
                        <p >{{item.name}}</p>
                    </router-link>
                </td>
                <td v-else>
                    <input  type="text" v-model="editedStudent.name">
                </td>
                <td>
                    <input v-if="this.editingId != item._id" type="checkbox" v-model="item.isDonePr">
                    <input v-else type="checkbox" v-model="editedStudent.isDonePr">
                </td>
                <td>
                    <p v-if="this.editingId != item._id">{{item.group}}</p>
                    <select v-else v-model="editedStudent.group">
                        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
                        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
                    </select>
                </td>
                <td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
                <td>
                    <img v-if="this.editingId != item._id" @click="editStudentShow(item._id)" src="https://img.icons8.com/material-outlined/24/null/pencil-tip.png"/>
                    <button v-else @click="editStudent(item._id)">Edit</button>
                </td>
			</tr>
		</table>
        <input v-model="student.name">
        <input type="checkbox" v-model="student.isDonePr">
        <select v-model="student.group">
            <option value="RPZ 19 1/9">RPZ 19 1/9</option>
            <option value="RPZ 19 2/9">RPZ 19 2/9</option>
        </select>
        <button @click="addStudent()">Add student</button>
        <br>
        <hr>

        <!-- <div class="converter">
            <h3>Converter</h3>
            <p>Amount: <input type="number" v-model = "convAmount" @change="convert()"></p>
            <p>From:
                <select v-model="convFrom" @change="convert()">
                    <option value="E">EUR</option>
                    <option value="H">UAH</option>
                    <option value="D">USD</option>
                </select> 
                To:
                <select v-model="convTo" @change="convert()">
                    <option value="E">EUR</option>
                    <option value="H">UAH</option>
                    <option value="D">USD</option>
                </select>
            </p>
            <p>
                DH = {{convDH}}<br>
                HD = {{convHD}}<br> 

                EH = {{convEH}}<br> 
                HE = {{convHE}}<br> 

                ED = {{convED}}<br>  
                DE = {{convDE}}<br>   
            </p>
            <p>Answer: <input type="text" v-model="convAnswer"></p>
        </div> -->

	</div>
</template>



<script>
import axios from 'axios';
 
 export default {
    data() {
        return {
            students: [],
            newmark: '',
            newgroup: '',
            newisDonePr: '',
            newname: '',
            piece: '',
            search: '',
            name:'',
            group:'',
            isDonePr:'',
            
            student: { "name": "", isDonePr: false, group: "RPZ 19 1/9" },
            editedStudent: { "name": "", isDonePr: false, group: "" },

            convertorData: [],
            convAmount: 1,
            convAnswer: 1,

            convHH: 1,
            convDD: 1,
            convEE: 1,

            convHD: 1,
            convDH: 1,

            convHE: 1,
            convEH: 1,

            convED: 1,
            convDE: 1,

            convFrom: 'D',
            convTo: 'H',

            editingId:'',
        }
    },
    mounted: function () {
        axios.get("http://34.82.81.113:3000/students").then((res) => {
            console.log(res.data);
            this.students = res.data;
        });

        axios.get("https://api.monobank.ua/bank/currency").then((res) => {
            console.log(res.data);
            this.convertorData = res.data;

            this.convDH = this.convertorData[0].rateBuy;
            this.convHD = 1 / this.convertorData[0].rateSell;

            this.convEH = this.convertorData[1].rateBuy;
            this.convHE = 1 / this.convertorData[1].rateSell;

            this.convED = this.convertorData[2].rateBuy;
            this.convDE = 1 / this.convertorData[2].rateSell;
        });
    },

    methods: {
        deleteStudent(studId) {
            axios.delete(`http://34.82.81.113:3000/students/${studId}`,).then((res)=>{
                this.students = this.students.filter((item)=>item._id !== studId);
            })
            // this.students = this.students.filter(elem => {
            //     return elem._id != studId;
            // });
        },
        addStudent() {
            // this.student._id = this.students.length + 1;
            // this.students.push({ ...this.student });
            axios.post("http://34.82.81.113:3000/students",{
                ...this.student
            }).then((res)=>{
                this.students.push(res.data);
            })
        },
        editStudentShow(studId) {
            this.editingId = studId;
            this.editedStudent = this.students.find(el=>{ return el._id == studId});
            //console.log(this.editedStudent);
        },
        editStudent(studId) {
            axios.put(`http://34.82.81.113:3000/students/${studId}`,{...this.editedStudent}).then((res)=>{ console.log(res.data);})
            this.editingId = '';
            //this.student = {"name": "", isDonePr: false, group: "" };
        },
        convert() {
            console.log(`conv${this.convFrom}${this.convTo}`);
            this.convAnswer = this.convAmount * this[`conv${this.convFrom}${this.convTo}`]
        }
    }
    }
</script>

<style scopped>
   
</style>