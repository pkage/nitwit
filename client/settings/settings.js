Template.settings.rendered = function() {
	$('#colorInputGroup').colorpicker({
		format: 'hex'
	});
	$('#bioInput').autogrow({speed: 0});

}


Template.settings.events({
	'submit #fullnameForm': function(ev) {
		ev.preventDefault();
		Meteor.call('update_fullname', $('#fullnameInput').val(), function(err, ret) {
			if (err != null) {
				sAlert.error('failed to change full name');
			} else {
				sAlert.success('changed full name successfully');
			}

		})
	},
	'submit #colorForm, hidePicker #colorForm': function(ev) {
		ev.preventDefault();
		if ($('#colorInput').val() == Meteor.user().profile.color) {
			return;
		}
		Meteor.call('update_color', $('#colorInput').val(), function(err, ret) {
			if (err != null) {
				sAlert.error('failed to change color');
			} else {
				sAlert.success('changed color successfully');
			}

		})
	},
	'submit #bioForm': function(ev) {
		ev.preventDefault();
		Meteor.call('update_bio', $('#bioInput').val(), function(err, ret) {
			if (err != null) {
				sAlert.error('failed to update bio');
			} else {
				sAlert.success('updated bio successfully');
			}

		})
	}
})