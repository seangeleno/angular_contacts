'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])
// Contacts Controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  //initialize Firebase
  var ref = new Firebase("https://seangeleno-contacts.firebaseio.com/contacts");

  //get Contacts
  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  //show Add Form
  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  //show Edit Form
  $scope.showEditForm = function(contact){
    $scope.editFormShow = true;

    //pass in current values
    $scope.id             = contact.$id;
    $scope.name           = contact.name;
    $scope.email          = contact.email;
    $scope.company        = contact.company;
    $scope.mobile_phone   = contact.phones[0].home;
    $scope.home_phone     = contact.phones[0].mobile;
    $scope.work_phone     = contact.phones[0].work;
    $scope.street_address = contact.address[0].street_address;
    $scope.city           = contact.address[0].city;
    $scope.state          = contact.address[0].state;
    $scope.zipcode        = contact.address[0].zipcode;

  }
  //hide form
  $scope.hide = function(){
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }
  //Submit Contact
  $scope.addFormSubmit = function() {
    console.log('Adding Contact...');

    // Assign values
    if($scope.name){var name = $scope.name} else { var name = null;}
    if($scope.email){var email = $scope.email} else { var email = null;}
    if($scope.company){var company = $scope.company} else { var company = null;}
    if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone} else { var mobile_phone = null;}
    if($scope.home_phone){var home_phone = $scope.home_phone} else { var home_phone = null;}
    if($scope.work_phone){var work_phone = $scope.work_phone} else { var work_phone = null;}
    if($scope.street_address){var street_address = $scope.street_address} else { var street_address = null;}
    if($scope.city){var city = $scope.city} else { var city = null;}
    if($scope.state){var state = $scope.state} else { var state = null;}
    if($scope.zipcode){var zipcode = $scope.zipcode} else { var zipcode = null;}

    //build out the object
    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [
        {
          mobile: mobile_phone,
          home: home_phone,
          work: work_phone
        }
      ],
        address: [
          {
            street_address: street_address,
            city: city,
            state: state,
            zipcode: zipcode
        }
      ]
    }).then(function(ref){
      var id = ref.key();
      console.log('Added Contact with ID:' + id);

      // Clear Form
      clearFields();

      //Hide form once submitted

      $scope.addFormShow = false;

      // Send a message to User

      $scope.msg = "Contact Added";
    });
  }

  //Edit contact
    $scope.editFormSubmit = function (){
    console.log('Updating Contact...');

    //Get ID
    var id = $scope.id;

    // Get Record
    var record = $scope.contacts.$getRecord(id);

    // Assing values
    record.name = $scope.name;
    record.email = $scope.email;
    record.company = $scope.company;

    record.phones[0].work = $scope.work_phone;
    record.phones[0].home = $scope.home_phone;
    record.phones[0].mobile = $scope.mobile_phone;

    record.address[0].street_address = $scope.street_address;
    record.address[0].city = $scope.city;
    record.address[0].state = $scope.state;
    record.address[0].zipcode = $scope.zipcode;

    //Save Contact - pass in firebase ref
    $scope.contacts.$save(record).then(function(ref){
      console.log(ref.key);
    });

    clearFields();

    //Hide Edit Form
    $scope.editFormShow = false;

    $scope.msg = "Contact Updated";
  }

  //Show Contact
  $scope.showContact = function (contact) {
    console.log('Getting Contact...');

    $scope.name           = contact.name;
    $scope.email          = contact.email;
    $scope.company        = contact.company;
    //have to grab first item in array [0]
    //phones
    $scope.mobile_phone   = contact.phones[0].home;
    $scope.home_phone     = contact.phones[0].mobile;
    $scope.work_phone     = contact.phones[0].work;;
    //address
    $scope.street_address = contact.address[0].street_address;
    $scope.city           = contact.address[0].city;
    $scope.state          = contact.address[0].state;
    $scope.zipcode        = contact.address[0].zipcode;

    $scope.contactShow = true;
  }

  $scope.removeContact = function (contact){
    console.log("Removing contact....beep....booooop.......pssst...crrrk..beep");

    $scope.contacts.$remove(contact);

    $scope.msg = "Contact Removed Successfully"
  }

  //Clear $scope Fields

  function clearFields(){
    console.log('Clearing all the fields....boop....beep..boop');

    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }


}]);
