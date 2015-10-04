<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html">
  <title>Animated Algorithms</title>

  <link rel="stylesheet" type="text/css" media="all" href="css/alt_project_style.css">
  <link rel="stylesheet" type="text/css" media="all" href="css/project_style.css">

  <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="js/animatescroll.js"></script>
  <script type="text/javascript" src="js/findMin.js"></script>
  <script type="text/javascript" src="js/findMax.js"></script>
  <script type="text/javascript" src="js/bubble.js"></script>

</head>

<body>
  <nav id="topnav">
    <ul>
      <li><a href="body">Home</a></li>
      <li><a href="#findMin">Find Minimum</a></li>
      <li><a href="#findMax">Find Maximum</a></li>
      <li><a href="#bubble">Bubble Sort</a></li>
      <li><a href="#test">Test</a></li>
    </ul>
  </nav>

  <section  class="sectContent">
    <h2 id="homeHead">Animated Algorithms</h2>
    <p id="p_home">
        Welcome to animated algorithms.<br>
        You know all about primitive data types and have just been introduced to arrays.
        Now you are going to want to do something useful with those concepts.
        How about finding the largest number or the smallest number?
        Or putting them into order?<br>
        The animations in the various sections are designed to help you understand what goes on
        when a program is executing and a test area that will re-enforce your understanding of the concepts.
        One of the first things to grasp is comparisons and how they are controlled through
        the mighty if statements.<br>
        You can also change the colour scheme by pressing one of the buttons below:<br>
        <button data-file="css/project_style">Dark Scheme</button>
        <button data-file="css/alt_project_style">Light scheme</button>
    </p>
  </section>

  <section id="findMin" class="sectContent">
      <h2>Find Minimum Value Algorithm</h2>

      <p id = "p1"> Click on New to fill array with random values <br>
	Click Start to animate finding the lowest value in array<br>
	Watch as the lowest value gets copied to the minValue variable<br>
      </p>

      <div id= "minButtons">
           <input type ="submit" id="newMinBtn" value="New"><br>
           <input type ="submit" id="startMinBtn"  value="Start">
      </div>

      <div id ="canvasMin">
	  <canvas id="searchMincanvas" width=602 height=250 > </canvas>
      </div>

      <p id ='p2'>  Pseudocode to find minValue:<br>
                 minVal = 51 <br>
                 if a < minVal <br>
                 minVal = a
      </p>

    <div id ="description_text">
	<br>
	<p id="text2"></p>
        <br><br>
	<p id="text1"></p>
    </div>
  </section>

  <section id="findMax" class="sectContent">
      <h2>Find Maximum Value Algorithm</h2>
	   <p id = "p1"> Click on New to fill array with random values <br>
		 Click Start to animate finding the highest value in array<br>
		 Watch as the highest value gets copied to the maxValue variable<br>
	 </p>

        <div id= "maxButtons">
            <input type="submit" id="newMaxBtn" value='New'><br>
            <input type="submit" id="startMaxBtn" value='Start'>
	</div>

        <div id = "canvasMax">
	   <canvas id="searchMaxcanvas" width=602 height=250 > </canvas>
	</div>

        <p id ='p2'>  Pseudocode to find maxValue:<br>
                 maxVal = 0 <br>
                 if a > maxVal <br>
                 maxVal = a
        </p>

	<div id ="description_text">
            <br>
            <p id="maxText2"></p>
            <br><br>
            <p id="maxText1"></p>
	 </div>
  </section>

  <section id="bubble" class="sectContent">
      <h2>Bubble Sort Algorithm</h2>
        <p id = "p1"> Click on New to fill array with random values <br>
		 Click Start to animate the bubble sort<br>
		 Watch as the highest value bubbles to the top in each iteration<br>
	 </p>

        <div id= "bubbleButtons">
            <p><select id="sizeSelection">
                <option value="1">10 elements</option>
		<option value="2">5 elements</option>
            </select></p>

            <p><select id="bubbleSelection">
                <option value="1">Sort Ascending</option>
		<option value="2">Sort Descending</option>
            </select></p>

            <p><select id="speed">
                <option value="1">slow speed</option>
		<option value="2">medium speed</option>
                <option value="3">fast speed</option>
            </select></p>

            <p><input type ="submit" id="startBubbleBtn" value="Start"></p>
            <p><input type ="submit" id="newBubbleBtn" value ="New"></p>
        </div>

	<div id = "canvasBubble">
            <canvas id="sortBubbleCanvas" width=602 height=250 > </canvas>
	</div>

        <p id ='p2'> Pseudocode for ascending bubble sort:<br>
                 tempVal = 0 <br>
                 j=n -> 0, j--<br>
                 i=0 -> n, i++<br>
                 if a > b <br>
                 tempVal = a<br>
                 a =b<br>
                 b=tempVal
	 </p>

	 <div id ="description_text">
            <br>
            <p id="bubbleText2"></p>
            <br><br>
            <p id="bubbleText1"></p>
	 </div>
   </section>

   <section id="test" class="sectContent">
        <h2>Algorithm Test</h2>

        <div id ="test_box">
            <p>Choose a skill to test:
                <form action="process_selection.php" method="POST">
                    <input type="radio" name="option" value ="max" checked>find max
                    <input type="radio" name="option" value ="min">  find min
                    <input type="submit" id="try" value ="try it">
                </form>
            </p>
        </div>
        <p id='testP'>Choose a test and try it, <br>if it proves a bit tricky go back <br>
            and watch the animations again</p>
    </section>
    <script type="text/javascript">

    $(function(){
      $('#topnav ul li a').on('click', function(e){
        e.preventDefault();
        var scrolldiv = $(this).attr('href');

        $(scrolldiv).animatescroll({padding:50});
      });

      $('button').click(function(){
          var stylesheet = $(this).attr('data-file');
          $('link').attr('href', stylesheet+'.css');
      });
    });
    </script>
</body>
</html>