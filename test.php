<?php
$string = "test2"; // The string to be bcrypt'ed

// Hash the string using bcrypt
$bcryptString = password_hash($string, PASSWORD_BCRYPT);

// Output the bcrypt'ed string
//echo $bcryptString . "";

echo md5($string);

echo "\n" . getIPAddress();


function getIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        // Check for shared Internet connection
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Check for proxy server
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED'])) {
        // Check for IP addresses from proxies
        $ip = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
        // Check for IP addresses in a cluster
        $ip = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
        // Check for IP addresses forwarded by proxy
        $ip = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['HTTP_FORWARDED'])) {
        // Check for IP addresses from forwarders
        $ip = $_SERVER['HTTP_FORWARDED'];
    } else {
        // Get the remote IP address
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    
    return 'User IP Address - '.$_SERVER['REMOTE_ADDR']; 
}


?>