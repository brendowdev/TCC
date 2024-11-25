const formulario = document.getElementById("formulario");
const tabelaJogos = document.getElementById("jogos-tabela").querySelector("tbody");
const horasTabela = {
  aventura: document.getElementById("horas-aventura"),
  esportes: document.getElementById("horas-esportes"),
  "quebra-cabeça": document.getElementById("horas-quebra-cabeça"),
  rpg: document.getElementById("horas-rpg"),
  acao: document.getElementById("horas-acao"),
  casual: document.getElementById("horas-casual")
};
const coresGenero = {
  aventura: "#FFD700",
  "quebra-cabeça": "#FF69B4",
  esportes: "#87CEEB",
  rpg: "#32CD32",
  acao: "#FF4500",
  casual: "#00324"
};

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const genero = document.getElementById("genero").value;
  const horas = parseInt(document.getElementById("horas-jogadas").value, 10);

  if (!nome || !genero || isNaN(horas) || horas <= 0) {
    return alert("Todos os campos são obrigatórios e devem conter valores válidos!");
  }

  adicionarJogoTabela(nome, genero, horas);
  atualizarTabelaHoras(genero, horas);

  formulario.reset();
  exibirMensagemSucesso();
});

function atualizarTabelaHoras(genero, horas) {
  const celulaHoras = horasTabela[genero];
  celulaHoras.textContent = parseInt(celulaHoras.textContent, 10) + horas;
}

function adicionarJogoTabela(nome, genero, horas) {
  const linha = document.createElement("tr");
  linha.style.backgroundColor = coresGenero[genero] || "#FFFFFF";

  const jogoData = [nome, genero, horas];
  jogoData.forEach((texto) => {
    const celula = document.createElement("td");
    celula.textContent = texto;
    linha.appendChild(celula);
  });

  tabelaJogos.appendChild(linha);
}

function exibirMensagemSucesso() {
  const mensagem = document.createElement("p");
  mensagem.textContent = "Jogo registrado com sucesso!";
  mensagem.style.color = "green";
  document.body.appendChild(mensagem);

  setTimeout(() => mensagem.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.estrelas').forEach(estrelasContainer => {
    estrelasContainer.addEventListener('click', event => {
      if (event.target.classList.contains('estrela')) {
        let ratingValue = event.target.getAttribute('data-value');
        [...estrelasContainer.children].forEach(estrela => {
          estrela.classList.toggle('selected', estrela.getAttribute('data-value') <= ratingValue);
        });
      }
    });
  });

  document.getElementById('enviar-feedback').addEventListener('click', () => {
    const feedback = document.getElementById('resultado-feedback');
    let respostas = [...document.querySelectorAll('.estrelas')].map(estrelasContainer => 
      estrelasContainer.querySelector('.selected') ? estrelasContainer.querySelector('.selected').getAttribute('data-value') : 0
    );

    if (respostas.includes(0)) {
      feedback.textContent = 'Por favor, avalie todas as perguntas!';
      feedback.className = 'resultado-feedback error';
    } else {
      feedback.textContent = `Obrigado pelo seu feedback!\n\nDesign: ${respostas[0]} estrelas\nNavegação: ${respostas[1]} estrelas\nRecomendação: ${respostas[2]} estrelas`;
      feedback.className = 'resultado-feedback success';
    }
  });
});
