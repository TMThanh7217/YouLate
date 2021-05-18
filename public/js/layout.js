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
      let eventIdEl = $('div#eventsSlider>div.item-event.slider-item.slider-item-active')
      let eventId = eventIdEl.data('eventId')
      attendancesData.eventId = eventId
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
      let eventIdEl = $('div#eventsSlider>div.item-event.slider-item.slider-item-active')
      let eventId = eventIdEl.data('eventId')
      attendancesData.eventId = eventId
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
    $('#inputEditCourseStatus').attr("placeholder", data.courseStatus)
    $('#textAreaEditCourseDescription').attr("placeholder", data.courseDesc)
  })

  $('.btn-edit-user').on('click', event =>{
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
    $('.slider-item-active').removeClass('slider-item-active')
    if(!eventDataEl.hasClass('slider-item-active')) eventDataEl.addClass('slider-item-active')
    $('.table-attendance').find('td>a.btn-attendance.btn-attendance-active').removeClass('btn-attendance-active')
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

  //----------------------------------------------------------------------------------------------------------------
  // Course management stuff
  $('#btnSubmitAddCourse').on('click', () => {
    let newCourse = {
      name: $('#inputCourseName').val(),
      code: $('#inputCourseCode').val(),
      description: $('#textAreaCourseDescription').val(),
      topic: $('#inputCourseTopic').val(),
      status: $('#inputCourseStatus').val(),
      courseLine: $('#inputCourseLine').val()
    };
    
    let url = "/manage/courses/addCourse";
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

  $('.btn-edit-course').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    //console.log(data)

    let url = '/manage/courses/editCourse';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('#btn-confirm-edit-course').on('click', event => {
    let courseData = {
      name: $('#inputEditCourseName').val(),
      code: $('#inputEditCourseCode').val(),
      description: $('#textAreaEditCourseDescription').val(),
      topic: $('#inputEditCourseTopic').val(),
      status: $('#inputEditCourseStatus').val(),
      courseLine: $('#inputEditCourseLine').val(),
      isEdited: true
    };

    console.log(courseData);
    
    let url = "/manage/courses/editCourse";
    $.ajax({
      url: url,
      type: 'POST',
      data: courseData,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/courses";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/courses";
        }
      }
    })
  });

  $('.btn-remove-course').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    data.isDelete = false;
    console.log(data)

    let url = '/manage/courses/deleteCourse';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('#btn-delete-course').on('click', () => {
    let url = '/manage/courses/deleteCourse';
    let data = { isDelete: true };
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/courses";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/courses";
        }
      }
    })
  });

  //----------------------------------------------------------------------------------------------------------------
  // Account management stuff
  $('.btn-edit-account').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    data.isEdited = false;
    //console.log(data)

    let url = '/manage/account/editAccount';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('.btn-delete-account').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    //console.log(data)

    let url = '/manage/account/deleteAccount';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });
  
  $('.btn-account-reset-pwd').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    console.log(data)

    let url = '/manage/account/resetAccountPwd';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('#btn-confirm-add-account').on('click', event => {
    let newUser = {
      name: $('#input-add-account-user-name').val(),
      email: $('#input-add-account-user-email').val(),
      SDT: $('#input-add-account-user-SDT').val(),
      DoB: $('#input-add-account-user-DoB').val()
    };

    let newAccount = {
      username: $('#input-add-account-username').val(),
      password: $('#input-add-account-password').val(),
      type: $('#input-add-account-type').val()
    };

    data = {
      newUser,
      newAccount
    }

    let missingData = false;

    let userData = Object.values(newUser);
    //data.userData = userData;
    for (let tmp of userData)
      if (!tmp)
        missingData = true;

    let accountData = Object.values(newAccount);
    //data.accountData = accountData;
    for (let tmp of accountData)
      if (!tmp)   
        missingData = true;

    if (missingData == true)
      return alert('Please input all data before submit');

    /*if (newUser.name == "" || newUser.email == "" || newUser.SDT == "" || newUser.DoB == "" || 
        newAccount.username == "" || newAccount.password == "" || newAccount.type == "")
      return alert('Please input all data before submit');*/

    let url = "/manage/account/addAccount"
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/account";
          alert('Username has already been taken!');
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/account";
        }
      }
    })
  });

  $('#btn-confirm-edit-account').on('click', event => {
    let accountData = {
      username: $('#inputAccountEditUserName').val(),
      type: $('#selectAccountEditType').val(),
      isEdited: true
    };
    //console.log(accountData);
    
    let url = "/manage/account/editAccount";
    $.ajax({
      url: url,
      type: 'POST',
      data: accountData,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/account";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/account";
        }
      }
    })
  });

  $('#btn-confirm-delete-account').on('click', event => {
    let url = '/manage/account/deleteAccount';
    let data = { isDelete: true };
    console.log(data);
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/account";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/account";
        }
      }
    })
  });

  $('#btn-confirm-reset-pwd').on('click', event => {
    let url = '/manage/account/resetAccountPwd';
    let data = { isReset: true };
    console.log(data);
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/account";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/account";
        }
      }
    })
  });
  //----------------------------------------------------------------------------------------------------------------
  // User management stuff
  $('.btn-edit-user').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    console.log(data)

    let url = '/manage/users/editUser';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('#btn-confirm-edit-user').on('click', event => {
    let courseData = {
      name: $('#inputEditUserName').val(),
      email: $('#inputEditUserEmail').val(),
      SDT: $('#inputEditUserPhoneNumber').val(),
      DoB: $('#inputEditUserDoB').val(),
      isEdited: true
    };

    //console.log(courseData);
    
    let url = "/manage/users/editUser";
    $.ajax({
      url: url,
      type: 'POST',
      data: courseData,
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/users";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/users";
        }
      }
    })
  });

  $('.btn-remove-user').on('click', event => {
    let target = $(event.target)
    let data = {}
    let idRow = target.parentsUntil('tbody', 'tr')
    // let idRow = target.parentsUntil('tbody')
    target.parentsUntil('tr', 'th, td').siblings().each((_, sib)=>{
      sib = $(sib)
      data[sib.attr('name')] = sib.text()
    })

    data.id = Number(idRow.data('id'))
    console.log(data)

    let url = '/manage/users/deleteUser';
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
      }
    })
  });

  $('#btn-delete-user').on('click', () => {
    let url = '/manage/users/deleteUser';
    let data = { isDelete: true };
    console.log(data);
    $.ajax({
      url: url,
      data: data,
      type: 'POST',
      success: result => {
        if(result.code == 400) { // Error
          document.location.href="/manage/users";
        }
        else if(result.code == 200) {// Success
          document.location.href="/manage/users";
        }
      }
    })
  });
  //----------------------------------------------------------------------------------------------------------------

  $('#btnAddEvent').on('click', () => {
    console.log($('tbody').find('tr[id="newEvent"]').length)
    if($('tbody').find('tr[id="newEvent"]').length) return
    let rowHtml = `<tr id='newEvent' class='event-data' style='background-color: rgba(60, 179, 113,0.3)'>
                      <th scope="row">
                      <div class="inner-addon right-addon">
                          <i class="fas fa-heading"></i>
                          <input data-name='title' type="text" class="form-control" placeholder="{{this.title}}"/>
                      </div>
                  </th>
                  <td>
                      <div class="inner-addon right-addon">
                          <i class="fas fa-calendar-day"></i>
                          <input data-name='date' type="text" class="form-control date-picker" placeholder="{{this.date}}"/>
                      </div>
                  </td>
                  <td>
                      <div class="inner-addon right-addon">
                          <i class="far fa-clock"></i>
                          <input data-name='startTime' type="text" class="form-control time-picker time-start" placeholder="{{this.startTime}}"/>
                      </div>
                  </td>
                  <td>
                      <div class="inner-addon right-addon">
                          <i class="fas fa-clock"></i>
                          <input data-name='endTime' type="text" class="form-control time-picker time-end" placeholder="{{this.startTime}}"/>
                      </div>
                  </td>
                  <td><select data-name='classroomId' class="form-control select-classroom-id" data-selected-id="{{this.id}}"></select></td>
                  <td>
                      <select data-name='edit' class="form-control" id="sel1">
                          <option value='true' {{#if this.edit}}selected{{/if}}>yes</option>
                          <option value='false' {{#unless this.edit}}selected{{/unless}}>no</option>
                      </select>
                  </td>
                  <td class='d-flex mange-event-btn-group'>
                      <a href="#" class='btn-manage btn-manage-edit'><i class="fas fa-2x fa-check-square"></i></a>
                      <a href="#" class='btn-manage btn-manage-remove'><i class="fas fa-2x fa-times-circle"></i></a>
                  </td>
                  </tr>`
    let rowEl = $(rowHtml)
    rowEl.find('a.btn-manage-remove').on('click', () => {
      $('#newEvent').remove()
    })
    rowEl.find('a.btn-manage-edit').on('click', e => {
      let target = $(e.target)
      let dataObj = {}
      let targetSiblings = target.parentsUntil('tr.event-data','th,td').siblings()
      let emptyDataTrigger = false
      targetSiblings.each((_,sib) => {
        sib = $(sib)
        let dataEl = sib.find('input.form-control, select')
        dataObj[dataEl.data('name')] = dataEl.val()
        if(!dataObj[dataEl.data('name')].trim())
          emptyDataTrigger = true
      })
      if(emptyDataTrigger) return alert('Please input all data of event before confirm add!')
      $.ajax({
        url: '/manage/events',
        method: 'POST',
        data: {
          data: dataObj,
          action: 'ADD'
        },
        success: response => {
          if (response.code != 200) return alert('ADD Fail: ' + response.message)
          $('#newEvent').attr('data-id', response.data.id)
          $('#newEvent').attr('style', '')
        }
      })
    })
    $('#eventsTable').prepend(rowEl)
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
    // Create Datepicker input
    $(".date-picker").datepicker();
    $.ajax({
      url: '/data/classrooms',
      type: 'POST',
      success: response => {
        let listId = response.data
        let target = $('#newEvent').find('.select-classroom-id')
        let selectedOption = target.data('selectedId')
        for(let id of listId) {
          let optionEl = $(`<option value=${id}>${id}</option>`)
          if (id.toString() == selectedOption.toString())
            optionEl.attr('selected', 'true')
          target.append(optionEl)
        }
      }
    })    
  })

  if($('.select-classroom-id').length)
    $.ajax({
      url: '/data/classrooms',
      type: 'POST',
      success: response => {
        let listId = response.data
        $('.select-classroom-id').each((_, target) => {
          target = $(target)
          let selectedOption = target.data('selectedId')
          for(let id of listId) {
            let optionEl = $(`<option value=${id}>${id}</option>`)
            if (id.toString() == selectedOption.toString())
              optionEl.attr('selected', 'true')
            target.append(optionEl)
          }
        })
      }
    })

  $('.mange-event-btn-group>.btn-manage.btn-manage-edit').on('click', e => {
    let target = $(e.target)
    let eventId = target.parentsUntil('tbody','tr').data('id')
    let dataObj = { id:eventId }
    let targetSiblings = target.parentsUntil('tr.event-data','th,td').siblings()
    let emptyDataTrigger = false
    targetSiblings.each((_,sib) => {
      sib = $(sib)
      let dataEl = sib.find('input.form-control, select')
      dataObj[dataEl.data('name')] = dataEl.val()
      if(!dataObj[dataEl.data('name')].trim())
        emptyDataTrigger = true
    })
    if(emptyDataTrigger) return alert('Please input all data of event before confirm edit!')
    $.ajax({
      url: '/manage/events',
      method: 'POST',
      data: {
        data: dataObj,
        action: 'UPDATE'
      },
      success: response => {
        if (response.code != 200) return alert('Update Fail: ' + response.message)
        for(let key in response.data)
          targetSiblings.find(`input[data-name="${key}"].form-control, select[data-name="${key}"]`).val(response.data[key])
      }
    })
  })

  $('.mange-event-btn-group>.btn-manage.btn-manage-remove').on('click', e => {
    let target = $(e.target)
    let eventId = target.parentsUntil('tbody','tr').data('id')
    let dataObj = { id:eventId }
    let targetSiblings = target.parentsUntil('tr.event-data','th,td').siblings()
    targetSiblings.each((_,sib) => {
      sib = $(sib)
      let dataEl = sib.find('input.form-control, select')
      dataObj[dataEl.data('name')] = dataEl.attr('placeholder') ? dataEl.attr('placeholder') : dataEl.find('option[selected').val() 
    })
    let removeEventModalEl = $('#removeEventConfirmModal')
    let modalDataEls = removeEventModalEl.find('div.modal-body>div.container>p>span.remove-event-attribute')
    modalDataEls.each((_,el) => {
      $(el).text(dataObj[$(el).data('name')])
    })
    removeEventModalEl.modal('show')
  })

  $('#btnSubmitRemoveEventConfirmModal').on('click', e => {
    let removeEventModalEl = $('#removeEventConfirmModal')
    let modalIdEl = removeEventModalEl.find('div.modal-body>div.container>p>span.remove-event-attribute[data-name="id"]')
    let ajaxData = { 
      action: 'REMOVE',
      data: Number(modalIdEl.text())
    }
    $.ajax({
      url: '/manage/events',
      type: "POST",
      data: ajaxData,
      success: response => {
        if (response.code != 200) return alert(`Remove Fail: ${response.message}`)
        $('tbody#eventTable').find(`tr[data-id="${modalIdEl.text()}"]`).remove()
      }
    })
    removeEventModalEl.modal('hide')
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

  // Create Datepicker input
  $(".date-picker").datepicker();
});
