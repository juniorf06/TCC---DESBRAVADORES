<?php
$email = $_POST['email'];
$senha = $_POST['password'];

// Exemplo fixo para teste (você pode usar banco de dados depois)
$usuarioCorreto = "usuario@teste.com";
$senhaCorreta = "1234";

if ($email === $usuarioCorreto && $senha === $senhaCorreta) {
    header("Location: WEB/inicial.html");
    exit();
} else {
    echo "E-mail ou senha incorretos.";
}
?>
