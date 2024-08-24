const pp1 = document.getElementById("pessoa1");
const pp2 = document.getElementById("pessoa2");
const pp3 = document.getElementById("pessoa3");
const pp4 = document.getElementById("pessoa4");
const restricaosim = document.getElementById("simp");
const restricaonao = document.getElementById("naop");
const seletorsexo = document.getElementById("seletorp");
const acessibilidadesim = document.getElementById("acesssim");
const acessibilidadenao = document.getElementById("acessnao");
const seletorhorario = document.getElementById("seletorhorario");
const de = document.getElementById("hora1p");
const ate = document.getElementById("hora2p");
const botaoadicionarp = document.getElementById("botaoadicionarpassageiro");
const segundap = document.getElementById("segundap");
const tercap = document.getElementById("tercap");
const quartap = document.getElementById("quartap");
const quintap = document.getElementById("quintap");
const sextap = document.getElementById("sextap");
const informacoesp = document.getElementById("textop");
const continuar = document.getElementById("botaop");
const horariosadicionaisp = document.getElementById("horariosadicionaisp");

localStorage.getItem("seletorp");
localStorage.getItem("seletorhorario");
localStorage.getItem("hora1p");
localStorage.getItem("hora2p");
localStorage.getItem("segundap") || "não";
localStorage.getItem("tercap") || "não";
localStorage.getItem("quartap") || "não";
localStorage.getItem("quintap") || "não";
localStorage.getItem("sextap") || "não";
localStorage.getItem("textop") || "não";

function desmarcarOutros(elemento, grupo) {
    grupo.forEach(item => {
        if (item !== elemento) {
            item.checked = false;
        }
    });
}

function adicionarHorario() {
    const div = document.createElement("div");
    div.classList.add("horario");

    const seletor = document.createElement("select");
    seletor.innerHTML = `
        <option value="Selecione uma opção">Selecione uma opção</option>
        <option value="manha">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
    `;
    const labelDe = document.createElement("label");
    labelDe.textContent = "De:";
    const inputDe = document.createElement("input");
    inputDe.type = "time";

    const labelAte = document.createElement("label");
    labelAte.textContent = "Até:";
    const inputAte = document.createElement("input");
    inputAte.type = "time";

    div.appendChild(seletor);
    div.appendChild(labelDe);
    div.appendChild(inputDe);
    div.appendChild(labelAte);
    div.appendChild(inputAte);

    horariosadicionaisp.appendChild(div);
}

botaoadicionarp.addEventListener("click", adicionarHorario);

[pp1, pp2, pp3, pp4].forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        desmarcarOutros(checkbox, [pp1, pp2, pp3, pp4]);
    });
});

[restricaosim, restricaonao].forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        desmarcarOutros(checkbox, [restricaosim, restricaonao]);

        if (restricaosim.checked) {
            seletorsexo.disabled = false;
        } else {
            seletorsexo.disabled = true;
            seletorsexo.value = "Selecione uma opção";
        }
    });
});

[acessibilidadesim, acessibilidadenao].forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        desmarcarOutros(checkbox, [acessibilidadesim, acessibilidadenao]);
    });
});

function boolToSimNao(value) {
    return value ? "sim" : "não";
}

continuar.addEventListener("click", (event) => {
    event.preventDefault();

    if ([pp1, pp2, pp3, pp4].every(checkbox => !checkbox.checked) ||
        [restricaosim, restricaonao].every(checkbox => !checkbox.checked) ||
        [acessibilidadesim, acessibilidadenao].every(checkbox => !checkbox.checked)) {
        alert("Por favor, selecione as opções necessárias.");
        return;
    }

    if (restricaosim.checked && seletorsexo.value === "Selecione uma opção") {
        alert("Por favor, selecione uma preferência de sexo.");
        return;
    }

    const horariosAdicionaisArray = Array.from(document.querySelectorAll(".horario")).map(horario => ({
        periodo: horario.querySelector("select").value,
        de: horario.querySelector("input[type='time']").value,
        ate: horario.querySelector("input[type='time']:nth-of-type(2)").value
    }));

    const dados = {
        maxpessoas: {
            p1: boolToSimNao(pp1.checked),
            p2: boolToSimNao(pp2.checked),
            p3: boolToSimNao(pp3.checked),
            p4: boolToSimNao(pp4.checked)
        },
        restricaosexo: {
            sim: boolToSimNao(restricaosim.checked),
            nao: boolToSimNao(restricaonao.checked),
            seletorsexo: restricaosim.checked ? seletorsexo.value : "não"
        },
        acessibilidade: {
            sim: boolToSimNao(acessibilidadesim.checked),
            nao: boolToSimNao(acessibilidadenao.checked)
        },
        horario: {
            seletorhorario: seletorhorario.value,
            de: de.value,
            ate: ate.value
        },
        dias: {
            segundap: boolToSimNao(segundap.checked),
            tercap: boolToSimNao(tercap.checked),
            quartap: boolToSimNao(quartap.checked),
            quintap: boolToSimNao(quintap.checked),
            sextap: boolToSimNao(sextap.checked)
        },
        horariosAdicionais: horariosAdicionaisArray,
        informacoes: informacoesp.value
    };

    localStorage.setItem("dadosPassageiro", JSON.stringify(dados));

    alert("Cadastrado(a) com sucesso!");
});