<?php
    function scrape($url){
        $output = file_get_contents($url); 
        return $output;
    }

    function fetchdata($data, $start, $end){
        $data = stristr($data, $start); // Stripping all data from before $start
        $data = substr($data, strlen($start));  // Stripping $start
        $stop = stripos($data, $end);   // Getting the position of the $end of the data to scrape
        $data = substr($data, 0, $stop);    // Stripping all data from after and including the $end of the  data to scrape
        return $data;   // Returning the scraped data from the function
    }
    
    $url = $_POST['url'];
    
//    $page = scrape("http://www.biernet.nl/bier/aanbiedingen/bij/boni"); //Fetch data from site
    $page = scrape("http://www.biernet.nl/bier/aanbiedingen/bij/".$url); //Fetch data from site
    
    $result = fetchdata($page, "<ul class=\"aanbiedingen\">" , "</ul>");
    

    echo json_encode(array('rank'=>$result)); // orginele code
?>

