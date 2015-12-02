Template.stream.helpers({
	'selector': function() {
		return this.selector;
	},
	'selectorHasResults': function() {
		return this.selector.count() > 0;
	}
})

Template.twitDeletionModal.events({
	'click #delete': function() {
		Meteor.call('delete_twit', Session.get('deletionModalTarget'), function(err) {
			if (err != null) {
				console.log(err);
			} else {
				$('#twitDeletionModal').modal('hide');
			}
		});
	}
})