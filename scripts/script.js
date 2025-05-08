function showClubSection() {
    // Oculta a primeira seção
    document.getElementById('section1').style.display = 'none';
    // Exibe a segunda seção
    document.getElementById('section2').style.display = 'block';
}

function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("active");
}

function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("active");
}

// Fechar o menu se o usuário clicar fora dele
document.addEventListener("click", function(event) {
    let sidebar = document.querySelector(".sidebar");
    let menuBtn = document.querySelector(".menu-btn");

    // Verifica se o clique NÃO foi dentro do menu nem no botão
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});

 // Aguarda 3 segundos e esconde a tela de carregamento
 setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("content").style.display = "block";
}, 3000);

// Faz o Botão "?" flutuar no menu
function abrirAjuda() {
    alert("Se precisar de ajuda, entre em contato com o suporte!");
}
