class Aluno {
    constructor(
        public id: number,
        public nomeCompleto: string,
        public idade: number,
        public altura: number,
        public peso: number
    ) {}
}

class Turma {
    constructor(
        public id: number,
        public nome: string,
        public alunos: Aluno[] = []
    ) {}

    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        const totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return totalIdades / this.alunos.length;
    }

    getMediaAlturas(): number {
        const totalAlturas = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return totalAlturas / this.alunos.length;
    }

    getMediaPesos(): number {
        const totalPesos = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return totalPesos / this.alunos.length;
    }

    // Método para adicionar aluno na turma
    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
    }

    // Método para remover aluno da turma
    removerAluno(id: number): void {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }

    // Método para atualizar os dados de um aluno na turma
    atualizarAluno(alunoAtualizado: Aluno): void {
        const index = this.alunos.findIndex(aluno => aluno.id === alunoAtualizado.id);
        if (index !== -1) {
            this.alunos[index] = alunoAtualizado;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const turma = new Turma(1, "Turma A");

    const numAlunosElement = document.getElementById("numAlunos");
    const mediaIdadesElement = document.getElementById("mediaIdades");
    const mediaAlturasElement = document.getElementById("mediaAlturas");
    const mediaPesosElement = document.getElementById("mediaPesos");
    const listaAlunosElement = document.getElementById("listaAlunos");

    function atualizarEstatisticas() {
        if (numAlunosElement && mediaIdadesElement && mediaAlturasElement && mediaPesosElement) {
            const numAlunos = turma.getNumAlunos();
            numAlunosElement.textContent = numAlunos ? numAlunos.toString() : '0';
            const mediaIdades = turma.getMediaIdades();
            mediaIdadesElement.textContent = !isNaN(mediaIdades) ? mediaIdades.toFixed(2) : '0.00';
            const mediaAlturas = turma.getMediaAlturas();
            mediaAlturasElement.textContent = !isNaN(mediaAlturas) ? mediaAlturas.toFixed(2) : '0.00';
            const mediaPesos = turma.getMediaPesos();
            mediaPesosElement.textContent = !isNaN(mediaPesos) ? mediaPesos.toFixed(2) : '0.00';
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
        adicionarBtn.addEventListener("click", function() {
            const nome = (document.getElementById("nome") as HTMLInputElement).value;
            const idade = parseInt((document.getElementById("idade") as HTMLInputElement).value);
            const altura = parseInt((document.getElementById("altura") as HTMLInputElement).value);
            const peso = parseInt((document.getElementById("peso") as HTMLInputElement).value);

            const novoAluno = new Aluno(turma.getNumAlunos() + 1, nome, idade, altura, peso);
            turma.adicionarAluno(novoAluno);
            atualizarEstatisticas();
            atualizarListaAlunos();
        });
    }

    const limparBtn = document.getElementById("limparBtn");
    if (limparBtn) {
        limparBtn.addEventListener("click", function() {
            (document.getElementById("nome") as HTMLInputElement).value = "";
            (document.getElementById("idade") as HTMLInputElement).value = "";
            (document.getElementById("altura") as HTMLInputElement).value = "";
            (document.getElementById("peso") as HTMLInputElement).value = "";
        });
    }

    atualizarEstatisticas();
    atualizarListaAlunos();
});
