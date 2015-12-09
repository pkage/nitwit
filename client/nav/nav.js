Template.navigation.rendered = function() {
	$('.navlink').parent().removeClass('active');
	$('[data-link=' + Router.current().route.getName().split('.')[0] + ']').parent().addClass('active');
}

Template.navigation.events({
	'click #logout': function() {
		Meteor.logout();
	}
})