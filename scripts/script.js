// Alternar para próxima seção do formulário de cadastro
function showClubSection() {
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    if (section1 && section2) {
        section1.style.display = 'none';
        section2.style.display = 'block';
    }
}

// Alternar visibilidade do menu lateral
function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// Fecha o menu se o usuário clicar fora dele
document.addEventListener("click", function(event) {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-btn");

    if (sidebar && menuBtn && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});

// Exibe a tela de carregamento por 3 segundos e depois esconde
window.addEventListener("load", function () {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }
    }, 1500);
});

// Função para abrir a janela de ajuda
function abrirAjuda() {
    alert("Se precisar de ajuda, entre em contato com o suporte!");
}
