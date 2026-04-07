options = {
    el:"#app",
    data: {
        teste: "asda"
    },
    methods:{
        setTeste(e){
            this.teste = e.target.value
            console.log("ok")
        }
    } 
}

const app =  new Vue(options)