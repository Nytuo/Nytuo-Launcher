<?php
require 'header.php';
?>
<main>
    <h1>Changeur de Nom d'utilisateur</h1>
    <p>Ici vous pouvez changer votre nom d'utilisateur, un redémarrage du Nytuo Launcher, des jeux ainsi que une reconnexion au compte du site est nécessaire.</p>

    <form style="text-align: center" action="changeUsername-logic.php" method="post">
        <input type="text" name="username" placeholder="Indiquer votre nouveau nom d'utilisateur"></br>
        <button type="submit" name="changeusername-submit">Changer de nom d'utilisateur</button>
    </form>
    <?php
    if (isset($_GET['change'])) {
        if ($_GET['change'] == 'success') {
            echo '<p>Votre nom d\'utilisateur a était changer avec succès.</p>';
        }
    }
    if (isset($_GET['error'])) {
        if ($_GET['error'] == 'mailinvalid') {
            echo '<p>Un problème a empecher l\'authentification.</p>';
        } else if ($_GET['error'] == 'sqlerror') {
            echo '<p>Le serveur a planté ! Réessayer!</p>';
        } else if ($_GET['error'] == 'usertaken') {
            echo '<p>Le nom d\'utilisateur est déjà utilisé.</p>';
        } else if ($_GET['error'] == 'usernamempty') {
            echo '<p>Veuillez remplir le champs ci-dessus.</p>';
        }
    }




    ?>
</main>