var projects = {}
var currentUser = null;

//call this after a user exists
var queryDb = function(user) {
  // Get a reference to the database service
  var db = firebase.database();

  // Requests reference
  var ref = db.ref('clients/' + user.username);

  ref.on('child_added', function(data) {
    pushProject(data.val().details);
    projects[data.key] = data.val();
  });
}

var pushProject = function(project) {
  if(!project.clientArchived) {
    if(project.address) {
      addToCurrentProjectsTable(project);
    }  
  }
}

var addToCurrentProjectsTable = function(project) {
  $('#projects-table-body').show();
  $('#projects-table-body').append('<tr class="projects-table-row" data-address="'+project.address+'"><td>'+project.address+'</td><td>'+project.city+'</td></tr>');
}

var showPendingRequests = function(address) {
  $('#projects-table').hide();
  $('#project-requests').show();

  let inspections = projects[address].inspections;

  for (inspection in inspections) {
    console.log(inspection);
    $('#requests-table-body').append('<tr class="requests-table-row" data-key="'+inspection+'"><td>'+inspections[inspection].inspectionType+'</td></tr>');
  }
}

$(document).ready(function() {
  // when we're going to do things, it's a good idea
  // to make sure the user is logged in. Check currentUser

  // do stuff when the user is logged in, in this case
  // populate currentUser var and current projects table
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user;
      queryDb(user);
    } else {
      $('#projects-table-body').empty();
    }
  });

  // CLICK HANDLERS

  // handle project row click. has to be generic
  // because rows are added dynamically
  $('#projects-table-body').on('click', '.projects-table-row', function() {
    showPendingRequests($(this).data().address);
  });
});
