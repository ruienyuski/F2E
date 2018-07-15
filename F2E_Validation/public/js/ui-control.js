/*form-control加入warn會顯示表單錯誤訊息 */
$(() =>{
    $('[data-toggle="tooltip"]').each(function (){
      var showHide = $el => {
        $el.tooltip($el.hasClass('warn') ? 'show': 'hide') //三元運算子，$el.hasClass('warn')為條件
      }//$el選取器去控制tooltip，class有warn就顯示
      var $this = $(this)
      new MutationObserver(mutations =>{
        mutations.forEach(mutation =>{
          mutation.attributeName === 'class' && showHide($this)
        })
        //監聽標籤有變時會通知，但可能同時很多標籤，所以用foreach迴圈
        //判斷mutation.attributeName是class時候就呼叫howHide傳入$this
      }).observe(this, {attributes:true,characterData:false,childList:false})
      //只要HTML的屬性有變動就通知我，使用MutationObserver，attributes被修改(True)就通知
      //characterData標籤內容
      //使用MutationObserver這個api時候，observe要把三個參數(attributes、characterData、childList)帶進去
      $this.tooltip({placement:'right',trigger:'manual'})
      //tooltip設定placement放右邊，trigger用手動控制
      showHide($this)
      //當第一次載入用showHide去控制顯示的項目
    })
    $('[data-from][data-to]').each(function(){
      var $this = $(this)
      var i = $this.data('from')
      do {
        $this.append(`<option value ="${i}">${i}</option>`)
      }
      while(i++ < $this.data('to'))
    })   //1900產生到2018年月日
 
    var $city = $('.city')
    var $region = $('.region')
    $city.length && $region.length && $.getJSON('data.json', data => {
      data.city.forEach((a , i) => {
        $city.append(`<option value = "${i}">${a}</option>`)
      })
      $city.change(() =>{
        $region.empty()
        data.region[$city.val()].forEach((a,i) => {
          $region.append(`<option value = "${i}">${a}</option>`)
        })
      })
    })


  })
  