<?php
require 'header.php';
?>
<main>
    <script>
        function laatimpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/laatim.html'
            console.log('file:///' + app.getAppPath() + '/laatim.html')
        }

        function sgbpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/sgb.html'
            console.log('file:///' + app.getAppPath() + '/sgb.html')
        }

        function sfpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/sf.html'
            console.log('file:///' + app.getAppPath() + '/sf.html')
        }

        function lapage() {
            window.location.href = 'file:///' + app.getAppPath() + '/la.html'
            console.log('file:///' + app.getAppPath() + '/la.html')
        }

        function vitfpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/vitf.html'
            console.log('file:///' + app.getAppPath() + '/vitf.html')
        }

        function ttdpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/ttd.html'
            console.log('file:///' + app.getAppPath() + '/ttd.html')
        }

        function fwdpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/fwd.html'
            console.log('file:///' + app.getAppPath() + '/fwd.html')
        }

        function tbpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/tb.html'
            console.log('file:///' + app.getAppPath() + '/tb.html')
        }

        function wrpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/wr.html'
            console.log('file:///' + app.getAppPath() + '/wr.html')
        }

        function aepage() {
            window.location.href = 'file:///' + app.getAppPath() + '/ae.html'
            console.log('file:///' + app.getAppPath() + '/ae.html')
        }

        function snpage() {
            window.location.href = 'file:///' + app.getAppPath() + '/sn.html'
            console.log('file:///' + app.getAppPath() + '/sn.html')
        }
        
    </script>
    
    <div style="text-align: center;">
        <?php

        if (isset($_SESSION['userId'])) :

        ?>
        <iframe
        onload="gameUsername('<?php echo $_SESSION['userUid']; ?>');passwordtxt('<?php echo $_SESSION['password'];?>');"
        src="javascript:void(0)" style="display: none;"></iframe>
            <p>Votre nom dans le Nytuo Universe est : <?php echo $_SESSION['userUid']; ?> </p>
            <p>Votre adresse mail est : <?php echo $_SESSION['mail']; ?></p>
            <a style="color: dodgerblue" href="reset-password.php">Demander un changement de mot de passe</a>
            <br />
            <a style="color: dodgerblue" href="changeUsername.php">Demander un changement de nom d'utilisateur</a>
            <br />
            <a style="color: dodgerblue" href="activate.php">Activé un jeu à l'aide d'une clé</a>
            <h1>Jeu(x) activé(s) sur votre compte: (incluant les jeux gratuits et les avants-premières)</h1>


            <div style="padding-top: 100px;"></div>

            <div class="cards-list">
                <?php
                if ($_SESSION['LAATIM'] == 1) {
                    echo '<a onclick="laatimpage()"><div class="card 1">
                    <div class="card_image"> <img src="Ressources/IMGLAATIM.png" /> </div>
                    <div class="card_title title-white">
                      <img src="Ressources/LogoLAATIM.png"  style="z-index: 1; width: 25%;top: 35%;left: 40%">
                    </div>
                  </div></a>';
                }
                if ($_SESSION['SGB'] == 1) {
                    echo '<a onclick="sgbpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/SGB2.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/SGB1.png" style="z-index: 1; width: 55%;top: 40%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['SF'] == 1) {
                    echo '<a onclick="sfpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGSF.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoSF.png" style="z-index: 1; width: 30%;top: 35%;left: 40%">
                      </div>
                    </div>
                  </a>';
                }

                if ($_SESSION['LA'] == 1) {
                    echo '<a onclick="lapage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGLA.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoLA.png" style="z-index: 1; width: 45%;top: 45%;left: 32%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['VITF'] == 1) {
                    echo '<a onclick="vitfpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGVITF.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoVITF.png" style="z-index: 1; width:60%;top: 35%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['TTD'] == 1) {
                    echo '<a onclick="ttdpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGTTD.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoTTD.png" style="z-index: 1; width: 40%;top: 25%;left: 32%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['FWD'] == 1) {
                    echo '<a onclick="fwdpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGFWD.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoFWD.png" style="z-index: 1; width: 38%;top: 30%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['TB'] == 1) {
                    echo '<a onclick="tbpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGTB.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoTB.png" style="z-index: 1; width: 40%;top: 25%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['WR'] == 1) {
                    echo '<a onclick="wrpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGWR.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoWR.png" style="z-index: 1; width: 40%;top: 30%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['AE'] == 1) {
                    echo '<a onclick="aepage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGAE.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoAE.png" style="z-index: 1; width: 40%;top: 30%;left: 35%">
                      </div>
                    </div>
                  </a>';
                }


                if ($_SESSION['SNRE'] == 1) {
                    echo '<a onclick="snpage()">
                    <div class="card 1">
                      <div class="card_image"> <img src="Ressources/IMGSN.png" /> </div>
                      <div class="card_title title-white">
                        <img src="Ressources/LogoSN.png" style="z-index: 1; width:25%;top: 35%;left: 40%">
                      </div>
                    </div>
                  </a>';
                }
                if ($_SESSION['LAATIM'] == 0 && $_SESSION['SGB'] == 0 && $_SESSION['SF'] == 0 && $_SESSION['LA'] == 0 && $_SESSION['VITF'] == 0 && $_SESSION['TTD'] == 0 && $_SESSION['FWD'] == 0 && $_SESSION['TB'] == 0 && $_SESSION['WR'] == 0 && $_SESSION['AE'] == 0 && $_SESSION['SNRE'] == 0) {
                    echo '<p>Il semblerait que ta bibliothèque soit vide...<br/>Cela n\'aurait pas du arriver...<br/>Contacte moi pour que je puisse régler cela aussi vite que possible! Tu peux envoyer ta demande via la section \'FeedBack\'!</p>';
                }
                ?>
            <?php endif ?>
            <?php
            if (isset($_SESSION['userId'])) {
            } else {
                echo '<h1> Pour voir des choses ici, vous devez-être connecté...</h1>';
            }

            ?>

            </div>
    </div>

</main>