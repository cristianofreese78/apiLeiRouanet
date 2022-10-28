// Urls de consulta
const urlAreas = "http://api.salic.cultura.gov.br/v1/projetos/areas";
const urlSegmentos = "http://api.salic.cultura.gov.br/v1/projetos/segmentos";

let area = document.getElementById('areas');
let segmento = document.getElementById('segmentos');
let projeto = document.getElementById('projetos');
let opcao = document.getElementById('opcoes');
let saidaprojeto = document.getElementById('saidaProjeto');

let optionsAreas;
let optionsSegmentos;
let optionsProjetos;
let optionsDescProjeto

// Adiciona evento change relacionado a opção de consulta
opcao.addEventListener('change', function(){
    let opcaoConsulta = this.options[this.selectedIndex].value;
            
    switch (opcaoConsulta){
        case "1": opcoesArea(); break;
        case "2": opcoesSegmento(); break;
    }
});

function opcoesArea(){
    optionsAreas = 0;
    area.hidden = false;
    segmento.hidden = true;
    projeto.hidden = true;
    //document.getElementById("welcome").hidden = true;
    getAreas();
}

function opcoesSegmento(){
    optionsSegmentos = 0;
    segmento.hidden = false;
    area.hidden = true;
    projeto.hidden = true;
    getSegmentos();
}

// Retorna o resultado da pesquisa na url informada
function getApi(url){
    return fetch(url).then((resp) => resp.json());
}

// Carrega áreas dos projetos no segundo select
async function getAreas() {
    const response = await fetch(urlAreas);
    const data = await response.json();
        
    let count = (Object.keys(data._embedded.areas).length);
    
    optionsAreas +=    `<option value="">Selecione uma área</option>`;
            
    for (let i=0; i<=(count-1); i++)  {
        optionsAreas += '<option value='+ data._embedded.areas[i].codigo +'>'+ data._embedded.areas[i].nome + '</option>';
    }
    
    area.innerHTML = optionsAreas;
}

// Carrega segmentos dos projetos no segundo select
async function getSegmentos() {
    const response = await fetch(urlSegmentos);
    const data = await response.json();
    
    let count = (Object.keys(data._embedded.segmentos).length);

    optionsSegmentos += `<option value="">Selecione um segmento</option>`;
    
    for (let i=0; i<=(count-1); i++)  {
        optionsSegmentos += '<option value='+ data._embedded.segmentos[i].codigo +'>'+ data._embedded.segmentos[i].nome + '</option>';
    }
    segmento.innerHTML = optionsSegmentos;
}


// Adiciona evento change relacionado ao template area. Carrega projetos por area
area.addEventListener('change', function(){
    let indiceArea = this.options[this.selectedIndex].value;
    projeto.hidden = false;
    optionsProjetos = 0;
        
    urlProjetosAreas = `http://api.salic.cultura.gov.br/v1/projetos/?limit=100&area=${indiceArea}&format=json`;
    optionsProjetos += `<option value="">Selecione um projeto</option>`;

    getApi(urlProjetosAreas).then((data) => {
        let count = (Object.keys(data._embedded.projetos).length);
        let NomeProjeto;
        let PRONACProjeto;
        for (let i=0; i<=(count-1); i++)  {
            NomeProjeto = data._embedded.projetos[i].nome;
            PRONACProjeto = data._embedded.projetos[i].PRONAC;
            optionsProjetos += '<option value='+ PRONACProjeto +'>'+ NomeProjeto + '</option>';
        }
        projeto.innerHTML = optionsProjetos;
    });
});

// Adiciona evento change relacionado ao template segmento. Carrega projetos por segmento
segmento.addEventListener('change', function(){
    let indiceSegmento = this.options[this.selectedIndex].value;
    projeto.hidden = false;
    optionsProjetos = 0;
    
    const urlProjetosSegmento = `http://api.salic.cultura.gov.br/v1/projetos/?limit=100&segmento=${indiceSegmento}&format=json`;
    
    getApi(urlProjetosSegmento).then((data) => {
        let count = (Object.keys(data._embedded.projetos).length);
        let NomeProjeto;
        let PRONACProjeto;

        for (let i=0; i<=(count-1); i++)  {
            NomeProjeto = data._embedded.projetos[i].nome;
            PRONACProjeto = data._embedded.projetos[i].PRONAC;
            optionsProjetos += '<option value='+ PRONACProjeto +'>'+ NomeProjeto + '</option>';
        }
        projeto.innerHTML = optionsProjetos;
    });
});


// Adiciona evento change relacionado ao carregamento de dados do projeto
projeto.addEventListener('change', function(){
    let indiceProjeto = this.options[this.selectedIndex].value;
    saidaprojeto.hidden = false;
    optionsDescProjeto = 0;
       
    const urlProjetosSegmento = `http://api.salic.cultura.gov.br/v1/projetos/${indiceProjeto}?format=json`;
    
    getApi(urlProjetosSegmento).then((data) => {
        optionsProjetos = `
    PRONAC: ${data.PRONAC}
    Ano Projeto: ${data.ano_projeto}
    Nome: ${data.nome}
    CGCCPF: ${data.cgccpf}
    Proponente: ${data.proponente}
    Segmento: ${data.segmento}
    Area: ${data.area}
    UF: ${data.UF}
    Municipio: ${data.municipio}
    Data Inicio: ${data.data_inicio}
    Data Termino: ${data.data_termino}
    Situação: ${data.situacao}
    Mecanismo: ${data.mecanismo}
    Enquadramento: ${data.enquadramento}
    Valor projeto: ${data.valor_projeto}
    Outras fontes: ${data.outras_fontes}
    Valor captado: ${data.valor_captado}
    Valor proposta: ${data.valor_proposta}
    Valor solicitado: ${data.valor_solicitado}
    Valor aprovado: ${data.valor_aprovado}
    Acessibilidade: ${data.acessibilidade}
    Objetivos: ${data.objetivos}
    Justificativa: ${data.justificativa}
    Etapa: ${data.etapa}
    Ficha Técnica: ${data.ficha_tecnica}
    Impacto Ambiente: ${data.impacto_ambiental}
    Especificação: ${data.especificacao_tecnica}
    Execução Estrangeira: ${data.estrategia_execucao}
    Providência: ${data.providencia}
    Democratização: ${data.democratizacao}
    Sinopse: ${data.sinopse}
    Resumo: ${data.resumo}`;
        saidaprojeto.innerHTML = optionsProjetos;
    });
});




/*
"_links": {
    "self": "http://api.salic.cultura.gov.br/v1/projetos/?limit=100&offset=101&sort=ano_projeto&format=json&",
    "prev": "http://api.salic.cultura.gov.br/v1/projetos/?limit=100&offset=1&sort=ano_projeto&format=json&",
    "last": "http://api.salic.cultura.gov.br/v1/projetos/?limit=100&offset=106900&sort=ano_projeto&format=json&",
    "first": "http://api.salic.cultura.gov.br/v1/projetos/?limit=100&offset=0&sort=ano_projeto&format=json&",
    "next": "http://api.salic.cultura.gov.br/v1/projetos/?limit=100&offset=201&sort=ano_projeto&format=json&"
}
*/








  //console.log(data._embedded.projetos[0].PRONAC);
  //console.log(data._embedded.projetos[0].valor_captado);
  //console.log(data._embedded.projetos[0].valor_proposta);
  //loadingElement.classList.add("hide");

  //postsContainer.innerHTML = data._embedded.projetos[0].PRONAC;
  
  
  
 
  





