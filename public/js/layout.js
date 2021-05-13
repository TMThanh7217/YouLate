/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */

function dropdownScript() {
  let dropdown = $("dropdown-btn")
  let dropdownDisplayList = [ "none", "block"]
  let dropdownDisplayTrigger = 0;
  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active")
      var dropdownContent = this.nextElementSibling;
      dropdownDisplayTrigger = (dropdownDisplayTrigger + 1) % 2
      dropdownContent.style.display = dropdownDisplayList[dropdownDisplayTrigger]
    });
  }
}

$(function() {
  // Setup signin, signup form switch Links
  $('.form-signin').css('display', 'block')
  $('.form-signup').css('display', 'none')
  
  // signin, signup form link clicked events
  $("#linkSignUp").on('click', () => {
    $('.form-signin').css('display', 'none')
    $('.form-signup').css('display', 'block')
  })
  $("#linkSignIn").on('click', () => {
    $('.form-signin').css('display', 'block')
    $('.form-signup').css('display', 'none')
  })

  // Term of Use clicked event
  $('#termOfUseLink').on('click', () => {
    // Show term
    $('#termOfUseModal').modal('show')
  })
 
  // Accept ToU checkbox click event
  $('#checkSignUpToU').on('click', () => {
    // Button disabled = true if checked ToU and yeah you knew it
    $('#btnFormSignUp').prop('disabled', !$('#checkSignUpToU').is(':checked'))
  })
  
  // button signin on header navbar
  $('.btn-signin').on('click', () => {
    document.location.href="/authorization"
  })

  // button signin in log in page
  $('#btnFormSignIn').on('click', () => {
    let data = {
      username: $('#inputSignInUsername').val(),
      password: $('#inputSignInPwd').val(),
      remember: $('#checkSignInRemember').is(':checked') 
    };

    console.log(data);
    let url = "/authorization/sign-in";
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: result => {
        let signInAlert = $('#signInAlert')
        let messageElement = $('#signInMessage')
        signInAlert.css('display', 'block')
        if(result.code == 400) { // Error
          if (!signInAlert.hasClass('alert-danger')) signInAlert.addClass('alert-danger')
          signInAlert.removeClass('alert-success')
        }
        else if(result.code == 200) {// Success
          if (!signInAlert.hasClass('alert-success')) signInAlert.addClass('alert-success')
          signInAlert.removeClass('alert-danger')
          this.location.href = "/";
        }
        messageElement.text(result.message)
      }
    })
  })

  // button signup in log in page
  $('#btnFormSignUp').on('click', () => {
    // let newAccount = {
    //   username: $('#inputSignUpUsername').val(),
    //   password: $('#inputSignUpPwd').val(),
    //   confirmPwd: $('#inputSignUpConfirmPwd').val()
    // }
    let newAccount = {}
    $.each($('#formSignUp').serializeArray(), function(_, kv) {
      if (newAccount.hasOwnProperty(kv.name.replace('inputSignUp','').toLowerCase())) {
        newAccount[kv.name.replace('inputSignUp','').toLowerCase()] = $.makeArray(newAccount[kv.name]);
        newAccount[kv.name.replace('inputSignUp','').toLowerCase()].push(kv.value);
      }
      else {
        newAccount[kv.name.replace('inputSignUp','').toLowerCase()] = kv.value;
      }
    });
    // console.log(newAccount)
    let signUpUrl = window.location.href.toString().replace('#','') + '/sign-up'
    console.log(newAccount)
    $.ajax({
      url: signUpUrl,
      type: 'POST',
      data: newAccount,
      success: result => {
        let signUpAlert = $('#signUpAlert')
        let messageElement = $('#signUpMessage')
        signUpAlert.css('display', 'block')
        if(result.code == 400) { // Error
          if (!signUpAlert.hasClass('alert-danger')) signUpAlert.addClass('alert-danger')
          signUpAlert.removeClass('alert-success')
        }
        else if(result.code == 200) {// Success
          if (!signUpAlert.hasClass('alert-success')) signUpAlert.addClass('alert-success')
          signUpAlert.removeClass('alert-danger')

        }
        messageElement.text(result.message)
      }
    })
  })

  $('.btn-logout').on('click', () => {
    document.location.href = "/authorization/logout";
  });
  // Create Datepicker input
  $(".date-picker").datepicker();
  
  // Create fullCalendar UI
  $('#calendar').fullCalendar({
    // put your options and callbacks here
    header: {
      left: "today prev,next",
      center: "title",
      right: "timelineDay,timelineThreeDays,agendaWeek,month"
    }
  })
  var myCalendar = $('#calendar'); 
  myCalendar.fullCalendar();
  var myEvent = {
    title:"my new event",
    allDay: true,
    start: new Date(),
    end: new Date()
  };
  myCalendar.fullCalendar( 'renderEvent', myEvent );

  dropdownScript();
});