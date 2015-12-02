Template.twitpost.rendered = function() {
	$('.twitpost-input').autogrow({speed: 0});
	Session.set('charcount', 0);
}

Template.twitpost.helpers({
	'charCount': function() {
		return 145 - Session.get('charcount');
	}
})

Template.twitpost.events({
	'keyup .twitpost-input': function(ev) {
		Session.set('charcount', $(ev.target).val().length);
	},
	'focus .twitpost-input': function() {
		$('.twitpost-button-group').slideDown();
	},
	'submit #twitpostForm': function(ev) {
		ev.preventDefault();
		text = $('.twitpost-input').val();
		Meteor.call('post_twit', text, function(err, ret) {
			if (err != null) {
				sAlert.error('an error occurred posting your twit');
			} else {
				$('.twitpost-input').val('');
				$('.twitpost-button-group').slideUp();
				$('.twitpost-input').removeAttr('style').autogrow({speed: 0});
				Session.set('charcount', 0);
			}
		})
	},
	'click .twitpost-cancel': function() {
		$('.twitpost-input').val('');
		$('.twitpost-button-group').slideUp();
		$('.twitpost-input').removeAttr('style').autogrow({speed: 0});
		Session.set('charcount', 0);
	}
})