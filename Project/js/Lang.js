/*
License (GNU GPL V3 you can find it on the internet or on the root of the source code (if you are on the compiled app : root/resources/app/)):
Copyright (C) 2021  Nytuo (Arnaud BEUX)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.*/

var fs = require('fs');
var dirnamew = __dirname.replace(/\\/g, "/")

if (window.location.href == 'file:///' + dirnamew + '/SelectLang.html?reload') {
    window.location.href = 'SelectLang.html';
}


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
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function(err, result) {
                    if (err) console.log(err)
                })

            } else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            }
            window.location.href = "Loading.html"
        } else {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function(err, result) {
                    if (err) console.log(err)
                })

            } else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            }
            window.location.href = "Loading.html"
        }
    } else {
        if (process.platform === 'linux') {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "FR", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "ES", function(err, result) {
                    if (err) console.log(err)
                })

            } else {
                console.log("Set EN")
                fs.writeFile(app.getPath("documents") + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            }
            window.location.href = "Loading.html"
        } else {
            console.log(selected);
            if (selected == "FR") {
                console.log("Set FR")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "FR", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "EN") {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            } else if (selected == "ES") {
                console.log("Set ES")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "ES", function(err, result) {
                    if (err) console.log(err)
                })

            } else {
                console.log("Set EN")
                fs.writeFile(parentfolder3 + "/nytuolauncher_data/LID.txt", "EN", function(err, result) {
                    if (err) console.log(err)
                })

            }
            window.location.href = "Loading.html"
        }
    }


}