$(function() {

  var Activities = {};

  Activities.urls = {
    index: {path: '/activities.json', method: 'get'},
    create: {path: '/activities.json', method: 'post'},
    // An id must be added to the activities update path
    update: {path: '/activities/', method: 'patch'}
  };

  Activities.saveActivity = function(event) {
    var _this = Activities;

    event.preventDefault();

    // collect the activity text fields entered by user
    var newActivity = {};
    newActivity.title = $('#activity_title').val();
    newActivity.body = $('#activity_body').val();

    // collect checked categories to save (nested attributes of activity)
    newActivity.tags_attributes = [];
    $('.categoryCheckboxes').filter(':checked').each(function() {
      newActivity.tags_attributes.push({category_id: this.id});
    });

    // save the new activity on the back end, and on success display
    $.post(_this.urls.create.path, {activity: newActivity}).done(_this.displayNewActivity);
  };

  Activities.redirect = function() {
    window.location = "/activities";
  };

  Activities.updateActivity = function(event) {
    var _this = Activities;

    event.preventDefault();

    // collect the activity text fields entered by user
    var updatedActivity = {};
    updatedActivity.title = $('#activity_title').val();
    updatedActivity.body = $('#activity_body').val();

    // collect checked categories to save (nested attributes of activity)
    updatedActivity.tags_attributes = [];
    $('.categoryCheckboxes').filter(':checked').each(function() {
      updatedActivity.tags_attributes.push({category_id: this.id});
    });

    // save the updated activity on the back end, and on success display
    $.ajax({url:  _this.urls.update.path + $("#update_activity").attr('activity-id') + '.json',
            type: _this.urls.update.method,
            data: {activity: updatedActivity}}).done(_this.redirect);
  };

  Activities.displayActivities = function(responseData) {
      // list the saved activities
      $(responseData).each(function(index, activity) {
        var activityHTML = HandlebarsTemplates.activities(activity);
        $('#activities').append(activityHTML);
      });
  };

  Activities.displayNewActivity = function(responseData) {
      // clear out stale data entry text fields
      $('#activity_title').val('');
      $('#activity_body').val('');
      $('.categoryCheckboxes').each(function(){$(this).prop('checked',false);});

      // append/display new saved activity
      var activityHTML = HandlebarsTemplates.activities(responseData);
      $('#activities').append(activityHTML);
  };

  Activities.show = function(activity) {
      // load the activity represented by the clicked button
      // toggle the active class to be the clicked tab
      // make all other tabs de-activated

      $('#activities_index_select').on("click", function(event){
        if (event.target.id != "Add_Activity"){
          $("#activities_index_select").children().each(function(index, button){
            if (button.classList.contains("active")) {
              button.removeClass("active");
            }
          });
          event.target.toggleClass("active");
        }


      });

  };

  Activities.getItems = function() {
    $.get(this.urls.index.path).done(this.displayActivities);
  };

  Activities.setEventHandlers = function() {
    $('#add_activity').on('submit', Activities.saveActivity);
    $('#update_activity').on('submit', Activities.updateActivity);
  };

  Activities.setEventHandlers();

  // if on the create activity page (index), then get items to display
  if ($('#add_activity').length !== 0) {
    Activities.getItems();    
  }

});

$(document).ready(function(){
    
    var photo_width = $('#content_photo').css('width');
    $('#content_tile').css('width', photo_width);
    var content_width = $('#content_tile').css('width');

  });



// on the activities index page
  // only show the add_new_form upon
  // clicking the add button
  $(document).ready(function(){
      $('#add_activity').hide();
      $('#add_act_button').click(function(){
      $('#add_activity').show();
      $('#activities').hide();
      $('#user_profile').hide();
    });
  });


    

    


