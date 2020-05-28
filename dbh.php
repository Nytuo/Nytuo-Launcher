<?php

$servername = "localhost";
$dbUsername = "nytukttd_Nytuo";
$dbPassword = "nytuoisthebest";
$dbName = "nytukttd_UserAccounts";

$conn = mysqli_connect($servername, $dbUsername, $dbPassword, $dbName);

if(!$conn){
    die("Connection failed!".mysqli_connect_error());
}