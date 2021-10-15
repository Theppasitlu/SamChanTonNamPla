document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      select: function(info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
      },
      selectable: true,
      selectMirror: true,
      unselectAuto: true,
      weekNumbers: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: ''
    });
  
    calendar.render();
  });