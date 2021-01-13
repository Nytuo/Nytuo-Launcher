document.getElementById('NEWSTXT').innerHTML = currentLanguage[150]
document.getElementById('HOMETXT').innerHTML = currentLanguage[151]
document.getElementById('SETTINGTXT').innerHTML = currentLanguage[5]
document.getElementById('LOGOUTTXT').innerHTML = currentLanguage[166]
document.getElementById('WEBTXT').innerHTML = currentLanguage[156]
try {
    document.getElementById('WEBGTXT').innerHTML = currentLanguage[173]

}catch(e){
    console.log("Not loaded:",e)
}

