<?php
session_start();

    $instr_message_min = <<< _EOT
        <p id="instructions"><span class ="search_title"> Finding the Min Value</span><br>
            Listed below is an array of 10 elements.<br>
            The <strong>minValue</strong> variable currently has a value of 51.<br>
            What values will be passed to minValue as the array is checked.<br><br>
            For example if the first number is 26 that is less than 51 so it will<br>
            be the new min value, if the next is 41 then that is greater than 26<br>
            so the next number in the series is tested and so on.<br>
            Enter each value to become minValue in the text box leaving a space between each entry.
                <br><br></p>
_EOT;

    //store th instruction message into superglobal SESSION
    $_SESSION['instr_message_min'] = $instr_message_min;
?>
<!DOCTYPE html>
<html>
    <head>
	<meta charset="utf-8">
	<title>Finding Min with HTML Canvas</title>
         <link rel="stylesheet" type="text/css" media="all" href="css/alt_project_style.css">
        <link rel="stylesheet" type="text/css" media="all" href="css/project_style.css">

	<script src="js/jquery-1.10.2.min.js"></script>
    </head>

    <body>
        <nav id="topnav">
            <ul>
              <li><a href="index.php" id="home">Back to Animated Algorithms</a></li>
            </ul>
        </nav><!-- @end #topnav -->

	<section id="testMin"  class="sectContent">
            <h2>Algorithm Test</h2>

            <div id ="test_box">
            <?php
            //display the instruction message if there is one in the superglobal SESSION
             if(isset($_SESSION['instr_message_min'])){
                 $instr_message =$_SESSION['instr_message_min'];
                 print $instr_message;
             }//end of if
             ?>

            <p id="form_para">
            <?php
            //display the random array and store into superglobal SESSION
            $myArray = array();
            for($i=0; $i<10; $i++){
                $myArray[$i]= rand(1,50);
                    echo " ". $myArray[$i] .", ";
                    if($i == 9){echo " ". $myArray[$i];}
            }//for
            $_SESSION["myArray"] = $myArray;
            ?>

            <form id="form_position" method= "POST" action = 'check_min_answer.php'>
            <input type = "text" name="values" >
            <input type = "submit">
            </form></p>

            <p id="message">
                <?php
                //display the appropriate message according to the user answer
                //after retrieving from the superglobal SESSION
                if(isset($_SESSION["message"])){
                   $message = $_SESSION["message"];
                    print $message;
                }//end of if
                ?>
            </p>
            </div>
        </section>
    </body>
</html>


