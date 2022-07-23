const isInteger = (str) => {
    if(str[0] === '0'){
        return false
    }
    const integers = {
        1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,0:true
    }
    for(let i = 0 ; i < str.length ; i++){
        if(!integers[str[i]]){
            return false
        }
    }
    return true
}

module.exports = {
    isInteger
}