$(document).ready(function() {
    $("#contact-form").validate({
      rules: {
        name: {
          required: true
        },
        "last-name": {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        }
      },
      messages: {
        name: {
          required: "Por favor ingresa tu nombre"
        },
        "last-name": {
          required: "Por favor ingresa tu apellido"
        },
        email: {
          required: "Por favor ingresa tu correo electrónico",
          email: "Por favor ingresa un correo electrónico válido"
        },
        message: {
          required: "Por favor ingresa tu consulta"
        }
      },
      errorElement: "div",
      errorPlacement: function(error, element) {
        error.addClass("invalid-feedback");
        element.closest(".form-group").append(error);
      },
      highlight: function(element, errorClass, validClass) {
        $(element).addClass("is-invalid").removeClass("is-valid");
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass("is-invalid").addClass("is-valid");
      }
    });
  });