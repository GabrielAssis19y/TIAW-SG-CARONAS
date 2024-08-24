const p1 = document.getElementById("p1")
const p2 = document.getElementById("p2")
const p3 = document.getElementById("p3")
const p4 = document.getElementById("p4")
const sempermissao = document.getElementById("sempermissao")
const naomeimporto = document.getElementById("naomeimporto")
const semalimentacao = document.getElementById("semalimentacao")
const sembebida = document.getElementById("sembebida")
const sim = document.getElementById("sim")
const nao = document.getElementById("nao")
const seletor = document.getElementById("seletor")
const hora1 = document.getElementById("hora1")
const hora2 = document.getElementById("hora2")
const botaoadicionar = document.getElementById("botaoadicionar")
const segunda = document.getElementById("segunda")
const terca = document.getElementById("terca")
const quarta = document.getElementById("quarta")
const quinta = document.getElementById("quinta")
const sexta = document.getElementById("sexta")
const texto = document.getElementById("texto")
const botao = document.getElementById("botao")
const horariosadicionais = document.getElementById("horariosadicionais")

function desmarcarOutros(elemento, grupo) {
    grupo.forEach(item => {
        if (item !== elemento) {
            item.checked = false
        }
    })
}

function adicionarHorario() {
    const div = document.createElement("div")
    div.classList.add("horario")

    const seletor = document.createElement("select")
    seletor.innerHTML = `
        <option value="Selecione uma opção">Selecione uma opção</option>
        <option value="manha">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
    `
    const labelDe = document.createElement("label")
    labelDe.textContent = "De:"
    const inputDe = document.createElement("input")
    inputDe.type = "time"

    const labelAte = document.createElement("label")
    labelAte.textContent = "Até:"
    const inputAte = document.createElement("input")
    inputAte.type = "time"

    div.appendChild(seletor)
    div.appendChild(labelDe)
    div.appendChild(inputDe)
    div.appendChild(labelAte)
    div.appendChild(inputAte)

    horariosadicionais.appendChild(div)
}

p1.addEventListener("click", () => {
    if (p1.checked) {
        p2.checked = false
        p3.checked = false
        p4.checked = false
    }
})
p2.addEventListener("click", () => {
    if (p2.checked) {
        p1.checked = false
        p3.checked = false
        p4.checked = false
    }
})
p3.addEventListener("click", () => {
    if (p3.checked) {
        p1.checked = false
        p2.checked = false
        p4.checked = false
    }
})
p4.addEventListener("click", () => {
    if (p4.checked) {
        p1.checked = false
        p2.checked = false
        p3.checked = false
    }
})

sempermissao.addEventListener("click", () => {
    if (sempermissao.checked) {
        naomeimporto.checked = false
        semalimentacao.checked = false
        sembebida.checked = false
    }
})
naomeimporto.addEventListener("click", () => {
    if (naomeimporto.checked) {
        sempermissao.checked = false
        semalimentacao.checked = false
        sembebida.checked = false
    }
})
semalimentacao.addEventListener("click", () => {
    if (semalimentacao.checked) {
        sempermissao.checked = false
        naomeimporto.checked = false
        sembebida.checked = false
    }
})
sembebida.addEventListener("click", () => {
    if (sembebida.checked) {
        sempermissao.checked = false
        naomeimporto.checked = false
        semalimentacao.checked = false
    }
})

sim.addEventListener("click", () => {
    if (sim.checked) {
        nao.checked = false
    }
})
nao.addEventListener("click", () => {
    if (nao.checked) {
        sim.checked = false
    }
})

botaoadicionar.addEventListener("click", adicionarHorario)

botao.addEventListener("click", (event) => {
    event.preventDefault()
    if (
        p1.checked == false &&
        p2.checked == false &&
        p3.checked == false &&
        p4.checked == false ||
        sempermissao.checked == false &&
        naomeimporto.checked == false &&
        semalimentacao.checked == false &&
        sembebida.checked == false ||
        sim.checked == false &&
        nao.checked == false ||
        seletor.value == "Selecione uma opção" ||
        hora1.value == "" ||
        hora2.value == "" ||
        segunda.checked == false &&
        terca.checked == false &&
        quarta.checked == false &&
        quinta.checked == false &&
        sexta.checked == false
    ) {
        alert("Por favor, preencha todos os campos")
    } else {
        const horariosAdicionaisArray = Array.from(horariosadicionais.children).map(div => {
            return {
                periodo: div.querySelector('select').value,
                de: div.querySelector('input[type="time"]').value,
                ate: div.querySelectorAll('input[type="time"]')[1].value
            }
        })

        const boolToSimNao = (bool) => bool ? "Sim" : "Não"

        const dadosCadastro = {
            passageiros: {
                p1: boolToSimNao(p1.checked),
                p2: boolToSimNao(p2.checked),
                p3: boolToSimNao(p3.checked),
                p4: boolToSimNao(p4.checked)
            },
            permissao: {
                sempermissao: boolToSimNao(sempermissao.checked),
                naomeimporto: boolToSimNao(naomeimporto.checked),
                semalimentacao: boolToSimNao(semalimentacao.checked),
                sembebida: boolToSimNao(sembebida.checked)
            },
            acessibilidade: {
                sim: boolToSimNao(sim.checked),
                nao: boolToSimNao(nao.checked)
            },
            horario: {
                periodo: seletor.value,
                de: hora1.value,
                ate: hora2.value
            },
            dias: {
                segunda: boolToSimNao(segunda.checked),
                terca: boolToSimNao(terca.checked),
                quarta: boolToSimNao(quarta.checked),
                quinta: boolToSimNao(quinta.checked),
                sexta: boolToSimNao(sexta.checked)
            },
            horariosAdicionais: horariosAdicionaisArray,
            texto: texto.value
        }

        localStorage.setItem("dadosMotorista", JSON.stringify(dadosCadastro))
        alert("Cadastrado(a) com sucesso!")
    }
})




