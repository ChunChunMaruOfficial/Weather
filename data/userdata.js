const userdata = {
    location: '',
    nickname: '',
    grad: '',
    wallpaper: 'linear-gradient(337deg, rgba(0, 74, 242, 0.7792366946778712) 0%,  rgba(0, 69, 255, 0.8212535014005602) 51%, rgba(0, 28, 77, 1) 100%)',
    setlocation: function(loc){
        this.location = loc
    },
    setwallpaper: function(wall){
        this.wallpaper = wall
    },
    setgrad: function(gradus){
        this.grad = gradus
    },
    setnickname: function(name){
        this.nickname = name
    }
}

module.exports = userdata