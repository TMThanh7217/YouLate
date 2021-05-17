/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */

$(function() {
  // Setup dropdown
  let dropdownDisplayList = [ "none", "block"]
  let dropdownDisplayTrigger = 0;
  let dropdown = $(".dropdown-btn")
  dropdown.each(() => {
    $(this).on('click', () => {
      $(this).toggleClass("sidenav-link-active")
      var dropdownContent = $(this).next();
      dropdownDisplayTrigger = (dropdownDisplayTrigger + 1) % 2
      dropdownContent.css('display', dropdownDisplayList[dropdownDisplayTrigger])
    })
  })

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

  // button change password page
  $('#btnFormChangePassword').on('click', () => {
    
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
      left: "today prev, next",
      center: "title",
      right: "timelineDay,timelineThreeDays,agendaWeek,month"
    }
  })

  // back
  $('.btn-back').on('click', ()=>{
    window.history.back()
  })

  // 
  $('#btnSaveAttendances').on('click', event =>{
    let target = $(event.target)
    let prevText = target.text()
    target.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>')
    let attendanceRows = $('.attendance-row')
    let rowsNeedCheck = attendanceRows.length
    let attendances = attendanceRows.find('.btn-attendance-active')
    let rowsChecked = attendances.length
    if (rowsChecked == rowsNeedCheck) {
      attendancesData = {list:[]}
      attendanceRows.each((_, row) => {
        row = $(row)
        attendancesData.list.push({
          userId: row.data('userId'),
          attendanceType: row.find('.btn-attendance-active').data('attendanceType') 
        })
      })
      $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: attendancesData,
        success: result => {
          alert(result.message)
          target.html(prevText)
        }
      })
    }
    else alert(`Need check all members includes both lectures & students. Remaining ${rowsNeedCheck - rowsChecked}`)
  })

  $('#btnSaveAndBackAttendances').on('click', event =>{
    let target = $(event.target)
    target.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
    let attendanceRows = $('.attendance-row')
    let rowsNeedCheck = attendanceRows.length
    let attendances = attendanceRows.find('.btn-attendance-active')
    let rowsChecked = attendances.length
    if (rowsChecked == rowsNeedCheck) {
      attendancesData = {list:[]}
      attendanceRows.each((_, row) => {
        row = $(row)
        attendancesData.list.push({
          userId: row.data('userId'),
          attendanceType: row.find('.btn-attendance-active').data('attendanceType') 
        })
      })
      $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: attendancesData,
        success: (result) => {
          alert(result.message)
          window.history.back()
        }
      })
    }
    else alert(`Need check all members includes both lectures & students. Remaining ${rowsNeedCheck - rowsChecked}`)
  })

  //
  $('.btn-attendance').on('click', event => {
    // clicked icon not a element so ...
    let targetButton = $(event.target).parent()    
    
    // add + remove class active
    if(!targetButton.hasClass('btn-attendance-active')) targetButton.addClass('btn-attendance-active')
    else targetButton.removeClass('btn-attendance-active')
    targetButton.siblings().each((_, sib) => {
      if($(sib).hasClass('btn-attendance-active')) $(sib).removeClass('btn-attendance-active')
    })
  })

  $('.btn-edit-course').on('click', event =>{
    let target = $(event.target)
    let idRow = target.parentsUntil('tbody', 'tr')
    let data = {}
    target.parentsUntil('tr', 'td,th').siblings().each((_,sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })
    // console.log(data)
    data.id = Number(idRow.data('id'))

    $('#inputEditCourseName').attr("placeholder", data.courseName)
    $('#inputEditCourseCode').attr("placeholder", data.courseCode)
    $('#inputEditCourseTopic').attr("placeholder", data.courseTopic)
    $('#inputEditCourseLine').attr("placeholder", data.courseLine)
  
  })

  $('#btn-edit-user').on('click', event =>{
    let target = $(event.target)
    let data = {}
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })
    // console.log(data)
    $('#inputEditUserName').attr('placeholder', data.editName)
    $('#inputEditUserEmail').attr('placeholder', data.editEmail)
    $('#inputEditUserPhoneNumber').attr('placeholder', data.editSDT)
    $('#inputEditUserDoB').attr('placeholder', data.editDoB)

  })

  $('.item-event').on('click', e => {
    let target = $(e.target)
    let eventDataEl = target.parentsUntil('#eventsSlider')
    let eventId = eventDataEl.data('eventId')
    console.log('cc')
    $.ajax({
      url: '/data/attendances',
      method: 'POST',
      data: {
        eventId: eventId
      },
      success: result => {
        let data = result.data
        for(let user of data) {
          let attendanceRow = $(`tr[data-user-id=${user.id}].attendance-row`)
          let btnAttendance = attendanceRow.find('td>a.btn-attendance').each((_,btn) => {
            btn = $(btn)
            if(btn.hasClass('btn-attendance-active')) btn.removeClass('btn-attendance-active')
            if(btn.data('attendanceType') == user.attendanceType) btn.addClass('btn-attendance-active')
          })
        }
      }
    })
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

  $('#btnSaveProfile').on('click', () => {
    let profileData = {
      username: $('#profileUsername').val(),
      name: $('#profileName').val(),
      email: $('#profileEmail').val(),
      phoneNum: $('#profilePhonenum').val(),
      DoB: $('#profileDoB').val()
      //,type: $('#smthing').val()
    };
    //console.log(profileData)
    
    let url = "/profile/edit";
    $.ajax({
      url: url,
      type: 'POST',
      data: profileData,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/profile";
        }
        else if(result.code == 200) {// Success
          document.location.href="/profile";
        }
      }
    })
  })

  $('.time-picker:not(.time-start,.time-end)').timepicker({
    timeFormat: 'hh:mm p',
    interval: 60,
    minTime: '8',
    maxTime: '22',
    defaultTime: '8',
    startTime: '8',
    dynamic: true,
    dropdown: true,
    scrollbar: true
  })

  $('.time-picker.time-start').timepicker({
    timeFormat: 'HH:mm',
    interval: 15,
    step: '15',
    minTime: '18',
    maxTime: '20',
    defaultTime: '8',
    startTime: '8',
    dynamic: true,
    dropdown: true,
    scrollbar: true
  });
  $('.time-picker.time-end').timepicker({
    timeFormat: 'HH:mm',
    interval: 15,
    step: '15',
    minTime: '19',
    maxTime: '22',
    defaultTime: '8',
    startTime: '8',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });

  $('#btnSubmitAddCourse').on('click', () => {
    let newCourse = {
      name: $('#inputCourseName').val(),
      code: $('#inputCourseCode').val(),
      description: $('#textAreaCourseDescription').val(),
      topic: $('#inputCourseTopic').val(),
      //status: $('#selectCourseStatus').val(),
      courseLine: $('#inputCourseLine').val()
    };
    
    let url = "/manage/courses/editCourse";
    $.ajax({
      url: url,
      type: 'POST',
      data: newCourse,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/courses";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/courses";
        }
      }
    })
  })

});
