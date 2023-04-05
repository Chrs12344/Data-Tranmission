function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }
    remove= function(index){
        return axios.delete("http://localhost:3000/users/"+ index);
    }

    add=function(name,city){
        return axios.put("http://localhost:3000/users", {name, city});
    }
    modify=function(index,name,city){
        return axios.post("http://localhost:3000/users/"+index, {name, city})
    }

    return {
        get: get,
        remove: remove,
        add: add,
        modify: modify,
    }
}