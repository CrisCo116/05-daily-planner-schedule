// Wrap all code that interacts with the DOM in a call to jQuery to ensure that

var currentDayEl = $('#currentDay')

// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.container-fluid').on('click', '.saveBtn', function() {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(timeBlockId, userInput);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateBlockClasses() {
    const currentHour = dayjs().hour();
  
    $('.time-block').each(function() {
      const blockHour = parseInt($(this).attr('id').replace('hour', ''));
  
      $(this).removeClass('past present future')
        .addClass(blockHour < currentHour ? 'past' : blockHour === currentHour ? 'present' : 'future');
    });
  }
  
  updateBlockClasses();
  setInterval(updateBlockClasses, 60000);
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var storedInput = localStorage.getItem(timeBlockId);
    if (storedInput) {
      $(this).find('.description').val(storedInput);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  var dayJsObject = dayjs();
  var dateEl = document.querySelector('#currentDay');
  dateEl.textContent = dayJsObject.format("MMMM DD YYYY hh:mm A");

});
