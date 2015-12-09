Template.twit.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.twit.helpers({
	'hiddenIfNotOwned': function() {
		return (this.author == Meteor.userId()) ? '' : 'hidden';
	},
	'timeago': function() {
		return moment(this.timestamp).fromNow();
	},
	'date': function() {
		return moment(this.timestamp).format("h:mma on MMM Do, YYYY");
	},
	'authorName': function() {
		try {
			return Meteor.users.findOne({_id: this.author}).profile.name
		} catch (err) {
			// ignore
		}
	},
	'authorHandle': function() {
		try {
			return Meteor.users.findOne({_id: this.author}).username
		} catch (err) {
			// ignore
		}
	},
	'starCount': function() {
		return Stars.find({target: this._id}).count();
	},
	'haveStarred': function() {
		return Stars.find({target: this._id, from: Meteor.userId()}).count() ? "glyphicon-star star-yellow" : "glyphicon-star-empty";
	},
	'processedBody': function() {
		var processed = this.body;
		for (var i = 0; i < this.mentions.length; i++) {
			processed = processed.replace('@' + this.mentions[i], '<a href="/user/' + this.mentions[i] + '">@' + this.mentions[i] + '</a>')	
		}
		

		return processed;
	}
});

Template.twit.events({
	'click .star-twit': function() {
		Meteor.call('toggle_twit_star', this._id);
	},
	'click .glyphicon-trash': function() {
		Session.set('deletionModalTarget', this._id);
		$('#twitDeletionModal').modal('show');
	},
	'click .glyphicon-comment': function() {
		$('.twitpost-input').val('@' + Meteor.users.findOne({_id: this.author}).username + ': ');
		$("html, body").animate({ scrollTop: $('#twitpostForm').offset().top }, 500);
		$('.twitpost-input').focus();
	}
});
