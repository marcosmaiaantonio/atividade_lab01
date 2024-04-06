"use strict";
// Definição da classe Aluno
class Aluno {
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
//  Turma
class Turma {
    constructor(id, nome, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    getNumAluno() {
        return this.alunos.length;
    }
    getMediaIdades() {
        const totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return totalIdades / this.alunos.length;
    }
    getMediaAlturas() {
        const totalAlturas = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return totalAlturas / this.alunos.length;
    }
    getMediaPesos() {
        const totalPesos = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return totalPesos / this.alunos.length;
    }


    // Método para adicionar aluno na turma
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    // Método para remover aluno da turma
    removerAluno(id) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }
    // Método para atualizar os dados de um aluno na turma
    atualizarAluno(alunoAtualizado) {
        const index = this.alunos.findIndex(aluno => aluno.id === alunoAtualizado.id);
        if (index !== -1) {
            this.alunos[index] = alunoAtualizado;
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const turma = new Turma(1, "Turma A");
    const numAlunosElement = document.getElementById("numAlunos");
    const mediaIdadesElement = document.getElementById("mediaIdades");
    const mediaAlturasElement = document.getElementById("mediaAlturas");
    const mediaPesosElement = document.getElementById("mediaPesos");
    const listaAlunosElement = document.getElementById("listaAlunos");
    function atualizarEstatisticas() {
        if (numAlunosElement && mediaIdadesElement && mediaAlturasElement && mediaPesosElement) {
            const numAlunos = turma.getNumAluno();
            numAlunosElement.textContent = numAlunos ? numAlunos.toString() : '0';
            const mediaIdades = turma.getMediaIdades();
            mediaIdadesElement.textContent = !isNaN(mediaIdades) ? mediaIdades.toFixed(2) : '0';
            const mediaAlturas = turma.getMediaAlturas();
            mediaAlturasElement.textContent = !isNaN(mediaAlturas) ? mediaAlturas.toFixed(2) : '0,00';
            const mediaPesos = turma.getMediaPesos();
            mediaPesosElement.textContent = !isNaN(mediaPesos) ? mediaPesos.toFixed(2) : '0,00';
        }
    }
    function atualizarListaAlunos() {
        if (listaAlunosElement) {
            // Limpando a lista antes de atualizar
            listaAlunosElement.innerHTML = "";
            turma.alunos.forEach(aluno => {
                const li = document.createElement("li");
                li.textContent = `${aluno.nomeCompleto} - Idade: ${aluno.idade}, Altura: ${aluno.altura}cm, Peso: ${aluno.peso}kg`;
                listaAlunosElement.appendChild(li);
            });
        }
    }
    const adicionarBtn = document.getElementById("adicionarBtn");
    if (adicionarBtn) {
        adicionarBtn.addEventListener("click", function () {
            const nome = document.getElementById("nome").value;
            const idade = parseInt(document.getElementById("idade").value);
            const altura = parseInt(document.getElementById("altura").value);
            const peso = parseInt(document.getElementById("peso").value);
            const novoAluno = new Aluno(turma.getNumAluno() + 1, nome, idade, altura, peso);
            turma.adicionarAluno(novoAluno);
            atualizarEstatisticas();
            atualizarListaAlunos();
        });
    }
    const limparBtn = document.getElementById("limparBtn");
    if (limparBtn) {
        limparBtn.addEventListener("click", function () {
            document.getElementById("nome").value = "";
            document.getElementById("idade").value = "";
            document.getElementById("altura").value = "";
            document.getElementById("peso").value = "";
        });
    }
    atualizarEstatisticas();
    atualizarListaAlunos();
});
