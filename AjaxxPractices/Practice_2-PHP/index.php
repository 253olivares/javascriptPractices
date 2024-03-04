<?php

include 'phpDataBaseConnect/db.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice 2 AJAX USING PHP</title>

    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <script>
        $(document).ready(()=>{
            var commentCount = 2;
            $("button").click(()=>{
                commentCount +=2;
                $("#comments").load("controller/loadComments.php", {
                    commentNewCount: commentCount
                },
                ()=>{
                    alert("New information should have loaded.");
                });
            });
        })
    </script>

</head>
<body>
    
    <div id="comments">
    <?php
        $sql= "SELECT * FROM comments LIMIT 2";
        $result = mysqli_query($conn, $sql);

        if( mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_assoc($result)){
                echo "<p>";
                echo $row['author'];
                echo "<br>";
                echo $row['message'];
                echo "</p>";
            }
        } else {
            echo "There are no comments in the data base";
        }

    ?>

    </div>

    <button>
        Show more comments
    </button>

</body>
</html>