//preencher o formulário com os dados de retorno de API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("api").value = endereco.api;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("saifi").value = endereco.siafi;
    document.getElementById("limpar").value=''; // Limpa o campo
}
 

//Verifica se o que foi digitado pelo usuário é somente número
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
    //vai testar t ou f se é numero retorna o numero
}

//verifica se o cep possui tamanho 8 e so possui numeros

function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
}

// função para pesquisa o CEP via API

 async function pesquisarCEP() {

    const cep = document.getElementById("cep").value.replace("-","");
    //Replace = quando vc encontrar o traço "-" troca por nada "";
    // Pois quero limitar para receber só numeros
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    

    if (cepValido(cep)) {
        //wait -- esperar o retorno das informações
        const dados = await fetch(url);
        //fetch -- metodo de busca de recurso de rede quando a resposta estiver disponivel - busca url
        //url -- endereço do servidor
        const endereco = await dados.json();
        console.log(endereco);

        if (endereco.hasOwnProperty("erro")){
            document.getElementById("endereco").value = "CEP não encontrado!!"
            //indica se tem a propriedade ou não
        } else {

        preencherFormulario(endereco)//testa

        }
        
    } else {
        document.getElementById("endereco").value = "CEP Invalido !"
     
    }
}
    //  async function limparCampo() {
    //     return document.getElementById("limpar").value='';



document.getElementById("cep").addEventListener("focusout",pesquisarCEP);

function LimpaCampos(endereco) {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ibge").value = "";
    document.getElementById("ddd").value = "";
    document.getElementById("saifi").value = "";
    document.getElementById("api").value = "";
}   

// Limpa todos os campos, ao clicar no botão limpar
document.getElementById("limpar").addEventListener("click", (e) => {
    LimpaCampos(endereco);
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("api").value = "";
})

// Se o campo CEP estiver preenchido, sempre que o botão salvar for clicado, será exibido um alert, que contem
// todas as informações que retornam da API 
document.getElementById("salvar").addEventListener("click", (e) => {
    if (document.getElementById("cep").value != "") {
        alert(document.getElementById("endereco").value + "\n" +
        document.getElementById("bairro").value + "\n" +
        document.getElementById("cidade").value + "\n"  +
        document.getElementById("estado").value + "\n"  +
        document.getElementById("ibge").value + "\n"  +
        document.getElementById("ddd").value + "\n"  +
        document.getElementById("saifi").value);
    } else {
        // Se o campo CEP não estiver preenchido, será exibido um alert, para reforçar o preenchimento do campo
        alert("Não há informações para serem exibidas. Preencha o campo CEP!")
    }
})