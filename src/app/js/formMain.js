// wait until document loads and then call menus and toggleSelect
$(document).ready(function() {
    formMain();
});

/*----form control----*/

function formMain() {
    $.validator.setDefaults({
        submitHandler: function() {
            $('#frmcontact').before('<div id="sucessform">Form Submitted successfully</div>');
            alert("form submitted")
        }
    });
    // validate signup form on keyup and submit
    $("#frmcontact").validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            success: "valid",
            submitHandler: function() {
                alert("Submitted!")
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            agree: "Please accept our policyy"
        }
    });
}