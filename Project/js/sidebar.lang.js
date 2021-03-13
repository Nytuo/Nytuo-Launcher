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

document.getElementById("NEWSTXT").innerHTML = currentLanguage[150];
document.getElementById("HOMETXT").innerHTML = currentLanguage[151];
document.getElementById("SETTINGTXT").innerHTML = currentLanguage[174];
document.getElementById("LOGOUTTXT").innerHTML = currentLanguage[166];
document.getElementById("WEBTXT").innerHTML = currentLanguage[156];
try {
  document.getElementById("WEBGTXT").innerHTML = currentLanguage[173];
} catch (e) {
  console.log("Not loaded:", e);
}
