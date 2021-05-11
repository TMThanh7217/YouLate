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

  // Temp of Use clicked event
  $('#tempOfUseLink').on('click', () => {
    // Show temp
    $('#tempOfUseModal').modal('show')
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