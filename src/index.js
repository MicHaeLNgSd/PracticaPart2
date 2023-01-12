import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var students = [{
    "_id": 1,
    "name": "Andrii Kurkov",
    "isDonePr": true,
    "group": "RPZ 19 2/9",
    "src": "https://orig00.deviantart.net/ee08/f/2009/073/e/d/free_red_panda_icon_100x100_by_supertuffpinkpuff.png"
},
{
    "_id": 2,
    "name": "Serhii Plohij",
    "isDonePr": false,
    "group": "RPZ 19 1/9",
    "src": "https://cdn-learn.adafruit.com/assets/assets/000/012/878/thumb100/led_strips_doge.bmp?1386611464"
},
{
    "_id": 3,
    "name": "Yurko Izdryk",
    "isDonePr": true,
    "group": "RPZ 19 2/9",
    "src": "https://vignette.wikia.nocookie.net/adventuretime/images/9/99/AT_Icons_100x100_Jake.jpg/revision/latest?cb=20120919222926&path-prefix=ar"
}
]


createApp({
    data() {
        return {
            students: [],
            newmark: '',
            newgroup: '',
            newisDonePr: '',
            newname: '',
            piece: '',
            search: '',
            student: { "name": "", isDonePr: false, group: "" },


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

        // axios.get("https://apilayer.com/marketplace/exchangerates_data-api#documentation-tab",
        //     {
        //         headers: {
        //             "apikey": "0sjTljESXiA3z56QG2VZ0P0Rjp7wGkfg"
        //         },
        //     }).then((res) => {
        //         console.log(res.data);
        //     })
    },

    methods: {
        deleteStudent(studId) {
            this.students = this.students.filter(elem => {
                return elem._id != studId;
            });
        },
        addStudent() {
            this.student._id = this.students.length + 1;
            this.students.push({ ...this.student });
        },
        convert() {
            console.log(`conv${this.convFrom}${this.convTo}`);
            this.convAnswer = this.convAmount * this[`conv${this.convFrom}${this.convTo}`]
        }
    },
}).mount('#app')
