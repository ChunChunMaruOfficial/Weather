const userdata = {
    location: '',
    nickname: '',
    grad: '',
    setlocation: function(loc){
        userdata.location = loc
    },
    setgrad: function(gradus){
        this.grad = gradus
    },
    setnickname: function(name){
        this.nickname = name
    }
}

module.exports = userdata