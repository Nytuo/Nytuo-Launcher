<?php
require 'header.php';
?>
<main>
    <h1>Activer un jeu: </h1>
    <p>Entrer le clé que vous avez reçu par mail.</p>
    <p>Après l'activation, si le jeu n'apparait dans votre profile ou dans le Nytuo Launcher, pensez a vous reconnecter pour mettre à jour vos informations.</p>

    <form style="text-align: center" action="activate-logic.php" method="post">
        <input type="text" name="key" placeholder="Insérer la clé d'activation"></br>
        <button type="submit" name="activate-submit">Activer!</button>
    </form>
    <?php
    if (isset($_GET['error'])) {
        if ($_GET['error'] == 'keyfieldsempty') {
            echo '<p>Vous devez entrer une clé pour la vérifier.</p>';
        } else if ($_GET['error'] == 'gameactive') {
            echo '<p>Le jeu que vous essayez d\'activer sur votre compte l\'ai déjà.</p>';
        } else if ($_GET['error'] == 'mailinvalid') {
            echo '<p>Un problème a empecher l\'authentification.</p>';
        } else if ($_GET['error'] == 'sqlerror') {
            echo '<p>Le serveur a planté ! Réessayer!</p>';
        } else if ($_GET['error'] == 'keyinvalid') {
            echo '<p>La clé que vous voulez activer n\'est pas valide</p>';
        }
    }
    if (isset($_GET['activate'])) {
        if ($_GET['activate'] == 'success') {
            echo '<p>Le jeu est activé avec succès.</p>';
        }
    }



    ?>
</main>