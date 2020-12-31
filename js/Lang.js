document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
});



function Lang_continu() {
    const result = document.querySelectorAll('input[name="group1"]')
    let selected
    for (const res of result) {
        if (res.checked) {
            selected = res.value
        }

    }
    if (portable == true) {
        if (process.platform === 'linux') {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            window.location.href = "Loading.html"
        } else {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            window.location.href = "Loading.html"
        }
    }else{
        if (process.platform === 'linux') {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "FR", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "ES", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else {
                console.log("Set EN")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            window.location.href = "Loading.html"
        } else {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function (err, result) {
                    if (err) console.log(err)
                })
        
            }
            window.location.href = "Loading.html"
        }
    }

    
}