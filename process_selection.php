<?php
session_start();
//if there is a selection made
if(isset($_POST["option"])){
    //if the selection made is max
    if($_POST["option"] == 'max'){
        //direct to skill max page
        header("location: skill_test_max.php");
    }//end of if
    //if the selection made is min
    else if($_POST["option"] == 'min'){
        //direct to skill min page
        header("location: skill_test_min.php");
    }//end of else if
}//end of outer if
?>
