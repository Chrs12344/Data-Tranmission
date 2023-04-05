var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        name: "",
        city: "",
        newname:"",
        newcity:"",
    },
    created: function () {
        this.usersService = users();
        this.usersService.get().then(response => (this.users = response.data));

    },
    methods: {

        remove: function(index){
            
            this.usersService.remove(index).then(response=>{
                this.usersService.get().then(response=>(this.users=response.data));
            });
        },
        add: function(name,city){
            this.usersService.add(name,city).then(response=>{
                this.usersService.get().then(response=>(this.users=response.data));
            });
        },
        modify: function(index){
            name = document.getElementById('name-' + index).value;
            city = document.getElementById('city-' + index).value;
            this.usersService.modify(index,name,city).then(response=>{
                this.usersService.get().then(response=>(this.users=response.data));
            });
        }
    }
})