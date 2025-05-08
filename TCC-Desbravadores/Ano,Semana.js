const meses = {
  marco: 31,
  abril: 30,
  maio: 31,
  junho: 30,
  julho: 31,
  agosto: 31,
  setembro: 30,
  outubro: 31,
  novembro: 30
};

const livros = [
  "genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "juizes", "rute",
  "1_samuel", "2_samuel", "1_reis", "2_reis", "1_cronicas", "2_cronicas", "esdras", "neemias",
  "ester", "jo", "salmos", "proverbios", "eclesiastes", "cantico_dos_canticos", "isaias",
  "jeremias", "lamentacoes", "ezequiel", "daniel", "oseias", "joel", "amos", "obadias", "jonas",
  "miqueias", "naum", "habacuque", "sofonias", "ageu", "zacarias", "malaquias",
  "mateus", "marcos", "lucas", "joao", "atos_dos_apostolos", "romanos", "1_corintios",
  "2_corintios", "galatas", "efesios", "filipenses", "colossenses", "1_tessalonicenses",
  "2_tessalonicenses", "1_timoteo", "2_timoteo", "tito", "filemom", "hebreus", "tiago",
  "1_pedro", "2_pedro", "1_joao", "2_joao", "3_joao", "judas", "apocalipse"
];

const versiculos = [
  "João 3:16", "Salmo 23:1", "Romanos 8:28", "Filipenses 4:13", "Mateus 5:14", "Isaías 40:31", 
  "Salmo 119:105", "Provérbios 3:5-6", "João 14:6", "1 Coríntios 10:13", "2 Coríntios 5:17", 
  "Hebreus 11:1", "1 Pedro 5:7", "Mateus 11:28", "Efésios 6:10", "Salmo 46:1", "1 João 1:9", 
  "Isaías 41:10", "Romanos 12:2", "Tiago 1:5", "Salmo 34:8", "João 8:32", "Colossenses 3:23", 
  "Filipenses 4:6-7", "2 Timóteo 1:7", "Salmo 121:1-2", "Romanos 15:13", "Hebreus 12:2", "Tiago 4:7", 
  "Mateus 6:33", "Efésios 2:8-9", "João 15:5", "2 Coríntios 4:16-18", "Salmo 139:23-24", "Atos 1:8", 
  "1 João 4:18", "Isaías 43:2", "Salmo 30:5", "Mateus 28:19-20", "Lucas 12:22-23", "Hebreus 13:5-6", 
  "Salmo 37:4", "Romanos 10:9", "Filipenses 3:14", "1 Coríntios 13:4-7", "João 15:13", "Tiago 1:12", 
  "Romanos 5:8", "Colossenses 2:6-7", "Salmo 55:22", "Isaías 55:6-7"
];

let livroAtual = 0;

// Recupera leituras concluídas do localStorage
const leiturasConcluidas = JSON.parse(localStorage.getItem('leituras')) || {};

function gerarAnoBiblico() {
  for (const mes in meses) {
    const ul = document.querySelector(`#${mes} ul`);
    ul.innerHTML = '';
    for (let dia = 1; dia <= meses[mes]; dia++) {
      const li = document.createElement("li");
      const link = document.createElement("a");

      const livro = livros[livroAtual % livros.length];
      const capitulo = 1;

      const leituraID = `${mes}-${dia}`;

      link.href = `https://www.bibliaon.com/${livro}_${capitulo}/`;
      link.textContent = `📖 Dia ${dia} - ${livro.replace(/_/g, " ").toUpperCase()} ${capitulo}`;
      link.target = "_blank";
      link.className = "link-biblia";

      li.dataset.livro = livro;
      li.appendChild(link);
      ul.appendChild(li);

      if (leiturasConcluidas[leituraID]) {
        li.classList.add("lido");
      }

      li.addEventListener("click", () => {
        li.classList.toggle("lido");
        leiturasConcluidas[leituraID] = li.classList.contains("lido");
        localStorage.setItem("leituras", JSON.stringify(leiturasConcluidas));
      });

      livroAtual++;
    }
  }
}

// Gerar estudos semanais com versículos para cada semana
function gerarEstudosSemanais() {
  const container = document.getElementById("semanas-estudo");
  for (let i = 1; i <= 52; i++) {
    const div = document.createElement("div");
    div.className = "quadro-semana";
    
    div.innerHTML = `
      <h4>📅 Semana ${i} - Versículo: ${versiculos[i-1]}</h4>
      <p><strong>Estudo da Semana:</strong> Leia e reflita sobre o versículo da semana.</p>
      <label for="reflexao-${i}">O que você achou deste versículo?</label>
      <textarea id="reflexao-${i}" placeholder="Escreva sua reflexão aqui..." rows="4"></textarea>
      <div>
        <input type="checkbox" id="confirmar-${i}" /> Eu li e refleti sobre o versículo.
      </div>
      <div>
        <a href="quiz${i}.html" target="_blank" class="quiz-link">👉 Faça o Quiz sobre o versículo da Semana ${i}</a>
      </div>
    `;
    container.appendChild(div);

    // Armazena a reflexão e confirmação no localStorage
    const reflexaoInput = document.getElementById(`reflexao-${i}`);
    const confirmarInput = document.getElementById(`confirmar-${i}`);

    reflexaoInput.addEventListener("input", () => {
      let reflexoes = JSON.parse(localStorage.getItem('reflexoes')) || {};
      reflexoes[i] = {
        reflexao: reflexaoInput.value,
        confirmado: confirmarInput.checked
      };
      localStorage.setItem('reflexoes', JSON.stringify(reflexoes));
    });

    confirmarInput.addEventListener("change", () => {
      let reflexoes = JSON.parse(localStorage.getItem('reflexoes')) || {};
      reflexoes[i] = {
        reflexao: reflexaoInput.value,
        confirmado: confirmarInput.checked
      };
      localStorage.setItem('reflexoes', JSON.stringify(reflexoes));
    });
  }
}

// Recupera as reflexões e confirmações armazenadas
function carregarReflexoes() {
  const reflexoes = JSON.parse(localStorage.getItem('reflexoes')) || {};

  for (let i = 1; i <= 52; i++) {
    const reflexaoInput = document.getElementById(`reflexao-${i}`);
    const confirmarInput = document.getElementById(`confirmar-${i}`);

    if (reflexoes[i]) {
      reflexaoInput.value = reflexoes[i].reflexao || '';
      confirmarInput.checked = reflexoes[i].confirmado || false;
    }
  }
}

// Filtro de livro bíblico
function ativarFiltro() {
  const input = document.getElementById("filtro-livro");
  input.addEventListener("input", () => {
    const filtro = input.value.toLowerCase();
    document.querySelectorAll(".mes ul li").forEach(li => {
      const livro = li.dataset.livro || "";
      li.style.display = livro.includes(filtro) ? "list-item" : "none";
    });
  });
}

// Modo escuro
function configurarModoEscuro() {
  const botao = document.getElementById("modo-escuro-toggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
  }

  botao.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });
}

// Modal para estudos
function configurarModal() {
  const modal = document.getElementById("modal-estudo");
  const fechar = document.getElementById("fechar-modal");

  fechar.addEventListener("click", () => modal.classList.add("hidden"));

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

function abrirModal(titulo, conteudo) {
  const modal = document.getElementById("modal-estudo");
  const conteudoDiv = document.getElementById("conteudo-estudo");
  conteudoDiv.innerHTML = `<h3>${titulo}</h3><p>${conteudo}</p>`;
  modal.classList.remove("hidden");
}

// Ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  gerarAnoBiblico();
  gerarEstudosSemanais();
  carregarReflexoes();
  ativarFiltro();
  configurarModoEscuro();
  configurarModal();
});
