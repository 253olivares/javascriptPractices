<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice 4 Validation Form</title>
    
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

        <script>
            $(document).ready(()=>{
                $("form").submit((e)=>{
                    e.preventDefault();
                    var name = $("#mail-name").val();
                    var email = $("mail-email").val();
                    var gender = $("mail-gender").val();
                    var message = $("mail-message").val();
                    var submit = $("mail-submit").val();

                    $(".form-message").load("controller/mail.php",{
                        name: name,
                        email:email,
                        gender: gender,
                        message: message,
                        submit: submit

                    },()=>{
                        alert("Information has been submitted");
                    });
                });
            })
        </script>
</head>
<body>
    <form>
        <input id="mail-name" type="text" name="name" placeholder="name">
        <br>
        <input id="mail-email" type="text" name="email" placeholder="E-mail">
        <br>
        <section id="mail-gender"  name="gender">
            <option value="male">Male</option>  
            <option value="female">Demale</option>
        </section>
        <br>
        <textarea id="mail-message" name="message" placeholder="Message..." cols="30" rows="10"></textarea>
        <br>
        <button id="mail-submit"  type="submit" name="submit">Submit E-mail</button>
        <!-- Message will inseart form feedback -->
        <p class="form-message">

        </p>
    </form>
</body>
</html>