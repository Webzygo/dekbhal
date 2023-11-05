$(document).ready(function() {
    //home page scroll function start here
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        // Define the scroll position at which you want to add the class
        var scrollPositionToAddClass = 100;

        if (scroll >= scrollPositionToAddClass) {
            $('#header').addClass('shadow-sm');
            $('#header').removeClass('br__bt');
        } else {
            $('#header').removeClass('shadow-sm');
            $('#header').addClass('br__bt');
        }
    });

    //home page slider start here
    function swiperSlider (){
        var swiper = new Swiper(".mySwiper", {
            pagination: {
              el: ".swiper-pagination",
              dynamicBullets: true,
            },
          });
    }

    //Register Page Validation start here 
    $("#userRegisterForm").submit(function (e) {
        e.preventDefault();
        
        // Initialize a variable to track whether there are any empty fields or validation errors.
        let hasError = false;
        
        // Function to show error message for a field.
        function showError(field, message) {
            field.addClass("fieldEmpty");
            field.siblings(".error-message").text(message);
            hasError = true;
        }
        
        // Function to clear the error message for a field.
        function clearError(field) {
            field.removeClass("fieldEmpty");
            field.siblings(".error-message").text("");
        }
    
        // Get input values
        let rName = $('#rFullName');
        let rEmail = $('#rEmail');
        let rNumber = $('#rNumber');
        let rPass = $('#rPass');
        let rCPass = $('#rCPass');
    
        // Validate each field
        if (rName.val().trim() === '') {
            showError(rName, 'Full Name is required');
        } else {
            clearError(rName);
        }
    
        if (rEmail.val().trim() === '') {
            showError(rEmail, 'Email is required');
        } else {
            clearError(rEmail);
        }
    
        if (rNumber.val().trim() === '') {
            showError(rNumber, 'Phone Number is required');
        } else if (!/^\d{10}$/.test(rNumber.val().trim())) {
            showError(rNumber, 'Phone Number should be 10 digits');
        } else {
            clearError(rNumber);
        }
    
        if (rPass.val().trim() === '') {
            showError(rPass, 'Password is required');
        } else {
            clearError(rPass);
        }
    
        if (rCPass.val().trim() === '') {
            showError(rCPass, 'Confirm Password is required');
        } else if (rPass.val().trim() !== rCPass.val().trim()) {
            showError(rCPass, 'Passwords do not match');
        } else {
            clearError(rCPass);
        }
    
        // Submit the form if there are no errors
        if (!hasError) {
            this.submit();
        }
    });

    //Login Page Validation start here
    $("#UserLoginForm").submit(function (e) {
        e.preventDefault();
    
        // Initialize a variable to track whether there are any validation errors.
        let hasError = false;
    
        // Function to show error message for a field.
        function showError(field, message) {
            field.addClass("fieldEmpty");
            field.siblings(".error-message").text(message);
            hasError = true;
        }
    
        // Function to clear the error message for a field.
        function clearError(field) {
            field.removeClass("fieldEmpty");
            field.siblings(".error-message").text("");
        }
    
        // Get input values
        let lEmail = $('#lEmail');
        let lPass = $('#lPass');
    
        // Validate each field
        if (lEmail.val().trim() === '') {
            showError(lEmail, 'Email is required');
        } else {
            clearError(lEmail);
        }
    
        if (lPass.val().trim() === '') {
            showError(lPass, 'Password is required');
        } else {
            clearError(lPass);
        }
    
        // Submit the form if there are no errors
        if (!hasError) {
            this.submit();
        }
    });

    //Drawer start here 

    

    //Drwaer End here 
    
    
    
    


    //Home Page Slider Function Call
    swiperSlider ();
   
});