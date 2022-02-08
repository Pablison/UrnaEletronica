//Variáveis de interface
let seuVotoPara = document.querySelector(".divisao1_1 span");
let cargo = document.querySelector(".divisao1_2 span");
let descricao = document.querySelector(".divisao1_4");
let aviso = document.querySelector(".divisao2");
let lateral = document.querySelector(".divisao1_right");
let numeros = document.querySelector(".divisao1_3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numero = ''
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = "none";

    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        let fotosHTML = "";
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="divisao1_image small"><img src="${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="divisao1_image"><img src="${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elementNumero = document.querySelector(".numero.pisca");
    if (elementNumero != null) {
        elementNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementNumero.classList.remove("pisca");
        if (elementNumero.nextElementSibling != null) {
            elementNumero.nextElementSibling.classList.add("pisca");
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numero = "";
    votoBranco = true;

    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = "";
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        console.log("Confirmando como BRANCO");
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando como "+numero);
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] != undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
        }
    }
}

comecarEtapa();
