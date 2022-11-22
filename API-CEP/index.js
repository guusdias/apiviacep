const cep = document.querySelector("#cep");

const showData = (result)=>{
    for(const campo in result)
    {
        if(document.querySelector("#"+campo))
        {
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}


cep.addEventListener("blur", (e)=>{
    let consult = cep.value.replace("-","")    
    const chose ={
        method: 'GET',
        node: 'cors',
        cache: 'default'
    }
    
    fetch(`https://viacep.com.br/ws/${consult}/json/`, chose)
    .then(Response =>{ Response.json()
        .then( data=> showData(data))
     })
    .catch(e => console.log("Erro! " + e))
})