<?php
$file = '../src/images/profile/66cc24474f666_1724654663_1858.jpg';
if (unlink($file)) {
    echo "Arquivo removido com sucesso.";
} else {
    echo "Erro ao remover o arquivo.";
}
?>

