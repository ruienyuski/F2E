(obj =>{
    typeof module === 'object' && module.exports ? module.exports = obj : this[obj.name] = obj
})({
    name:'universal',
    checkEmail: val => /.+@.+\..+/.test(val),  //a@a.a就符合該正規式
    checkPassword(val){
        return /.{8,}/.test(this._password = val) //存第一個密碼到_password
    },
    checkConfirmPassword (val) {
        return this._password === val   //輸入第二次密碼與_password比對
    },
    checkPhone: val => /^09\d{8}$/.test(val),
    checkAddress: val => /[\u4e00-\u9fa5]/.test(val), //繁體中文字的區間範圍
    checkImage: ary => ary.length <= 3 && ary.every(file => file.width <= 150 || file.height <= 150),
    checkCardNumber (val) {
      val = val.replace(/\s/g, '')
      return (/^4[0-9]{12}(?:[0-9]{3})?$/.test(val) && 'visa') ||
      (/^5[1-5][0-9]{14}$/.test(val) && 'master') || ''
    }
})

//只要在後端環境就把obj丟到module.exports
//: this[obj.name] = obj 在全域插入一個指定的名稱(universal)