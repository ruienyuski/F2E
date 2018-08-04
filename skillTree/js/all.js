var app = new Vue({
  el: "#app",
  data: {
    levelImg:[
      ( "images/img-ship-noob.png"),
      ( "images/img-ship-beginner.png"),
      ( "images/img-ship-developer.png"),
      ( "images/img-ship-master.png")
    ],
    TreeData: [
      { 
        itemImg: "category",
        title:'BASIC SKILLS',
        id:'Basics01',
        category:"Basics",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "Learn HTML", checked: false },
          { title: "Basics of CSS", checked: false },
          { title: "Basics of JavaScript", checked: false }
        ],
        optional: []
      },
      {
        itemImg: "build",
        title:'BASIC TOOLS',
        id:'Basics02',
        category:"Basics",
        ismrAuto:true,
        isDone:false,
        recommend: [
          { title: "Git - Version Contro", checked: false },
          { title: "Basic Terminal Usage", checked: false },
          { title: "Text Editor", checked: false },
          { title: "Heart of Reserching", checked: false }
        ],
        optional: []
      },
      {
        itemImg: "flip_to_front",
        title:'CSS FRAMEWORK',
        id:"CSS01",
        category:"CSS",
        ismrAuto:false,
        isDone:false,
        recommend: [{ title: "Bootstrap", checked: false }],
        optional: [
          { title: "UIKit", checked: false },
          { title: "Foundation", checked: false },
          { title: "Semantic UI", checked: false }
        ]
      },
      {
        itemImg: "view_quilt",
        title:'CSS PREPROCESSORS',
        id:"CSS02",
        category:"CSS",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "Sass", checked: false },
          { title: "PostCSS", checked: false }
        ],
        optional: [
          { title: "Less", checked: false },
          { title: "Stylus", checked: false }
        ]
      },
      {
        itemImg: "developer_board",
        title:'CSS ARCHITECHTURE',
        id:"CSS03",
        category:"CSS",
        ismrAuto:false,
        isDone:false,
        recommend: [{ title: "OOCSS", checked: false }],
        optional: [{ title: "SMACSS BEM", checked: false }]
      },
      {
        itemImg: "devices",
        title:'CSS SKILLS',
        id:"CSS04",
        category:"CSS",
        ismrAuto:false,
        isDone:false,
        recommend: [{ title: "Responsive Web Flexbox", checked: false }],
        optional: []
      },
      {
        itemImg: "widgets",
        title:'CSS MASTERY',
        id:"CSS05",
        category:"CSS",
        ismrAuto:true,
        isDone:false,
        recommend: [],
        optional: [
          { title: "Grid Layout", checked: false },
          { title: "Animation", checked: false },
          { title: "Transform 2D, 3D", checked: false }
        ]
      },
      {
        itemImg: "hdr_strong",
        title:'BASIC DOM',
        id:"JS01",
        category:"Javascript",
        ismrAuto:false,
        isDone:false,
        recommend: [],
        optional: [
          { title: "jQuery", checked: false },
        ]
      },
      {
        itemImg: "gradient",
        title:'WEB DRAWING',
        id:"JS02",
        category:"Javascript",
        ismrAuto:true,
        isDone:false,
        recommend: [],
        optional: [
          { title: "SVG", checked: false },
          { title: "Canvas", checked: false },
          { title: "D3.js", checked: false }
        ]
      },
      {
        itemImg: "format_quote",
        title:'JAVASCRIPT SKILLS',
        id:"JS03",
        category:"Javascript",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "ES6", checked: false },
        ],
        optional: []
      },
      {
        itemImg: "developer_mode",
        title:'JAVASCRIPT FRAMEWORK',
        id:"JS04",
        category:"Javascript",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "Vue.js", checked: false },
          { title: "Angular", checked: false },
          { title: "React.js", checked: false }
        ],
        optional: []
      },
      {
        itemImg: "nfc",
        title:'JAVASCRIPT PREPROCESSORS',
        id:"JS05",
        category:"Javascript",
        ismrAuto:false,
        isDone:false,
        recommend: [],
        optional: [
          { title: "TypeScript", checked: false },
          { title: "Babel", checked: false },
          { title: "CoffeeScript", checked: false }
        ]
      },
      {
        itemImg: "device_hub",
        title:'PACKAGE MANAGERS',
        id:"Managers01",
        category:"Managers",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "NPM", checked: false },
          { title: "YARN", checked: false }
        ],
        optional: [
          { title: "Bower", checked: false },
        ]
      },
      {
        itemImg: "import_contacts",
        title:'TASK RUNNERS',
        id:"Managers02",
        category:"Managers",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "npm scripts", checked: false },
          { title: "gulp", checked: false }
        ],
        optional: [
          { title: "grunt", checked: false }
        ]
      },
      {
        itemImg: "table_chart",
        title:'BUILD TOOLS',
        id:"Managers03",
        category:"Managers",
        ismrAuto:false,
        isDone:false,
        recommend: [
          { title: "Webpack", checked: false }
        ],
        optional: [
          { title: "Parcel", checked: false }
        ]
      }
    ],
    clickList:['Basics'],
    levelText: 0,
    myItem: {},
    isbtnClick:false
  },
  mounted(){
    // init 
    this.myItem = this.TreeData[0]
  },

  computed: {
    nowImg(){
      if(this.isCategory('Managers')){
        this.levelText = 3
        return this.levelImg[3]
      }else if(this.isCategory('Javascript')){
        this.levelText = 2
        return this.levelImg[2]
      }else if(this.isCategory('CSS')){
        this.levelText = 1
        return this.levelImg[1]
      }else{
        this.levelText = 0
        return this.levelImg[0]
      }
    },
    basicLists(){
      return this.TreeData.filter(item => item.category == "Basics")
    },
    cssLists(){
      return this.TreeData.filter(item => item.category == "CSS")
    },
    jsLists(){
      return this.TreeData.filter(item => item.category == "Javascript")
    },
    managerLists(){
      return this.TreeData.filter(item => item.category == "Managers")
    }
  },

  methods: {
    isCategory(index){
      return this.clickList.findIndex(item => item == index) != -1
    },

    addItem(e){
      this.clickList.push(e);
    },

    showDetail(data){
      this.myItem = data;
    },
    //按鈕加上checked功能
    checkItem: function(id,index,categoryItem){
      this.isbtnClick = !this.isbtnClick;
      //es5寫法
        // var goalItem = this.TreeData.find(
        //   function(item) {
        //     return  item.id == id;
        //   }
        // ) 
      let goalItem = this.TreeData.find(item => item.id == id);
      if(categoryItem == 'recommend'){
        goalItem.recommend[index].checked =! goalItem.recommend[index].checked;
        goalItem.isDone = goalItem.recommend.every(i => i.checked === true);

      }else if(categoryItem == 'optional'){
        goalItem.optional[index].checked =! goalItem.optional[index].checked;
        goalItem.isDone = goalItem.optional.every(i => i.checked === true);

      }



      // can click next level
      if(this.basicLists.every(i => i.isDone==true)){
        this.clickList.push('CSS')
      }
      if(this.cssLists.every(i => i.isDone==true)){
        this.clickList.push('Javascript')
      }
      if(this.jsLists.every(i => i.isDone==true)){
        this.clickList.push('Managers')
      }




    },
    // 按鈕切換時，中間項目會隨之加減
    checkedLength(list){
      return list.filter(item => item.checked == true).length;
    },


  }

});
