import Ember from 'ember';

var Photo = Ember.Object.extend({
	title: '',
	username: '',
	url: '',
});

var PhotoCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
	sortProperties: ['title'],
	sortAscending: true,
	content: [],
});

var testPhotos = PhotoCollection.create();
var testimg1 = Photo.create({
	title: "Google logo",
	username: "google",
	url: "https://www.google.com/images/srpr/logo11w.png"
});

var testimg2 = Photo.create({
	title: "UNO logo",
	username: "UNO",
	url: "http://www.unomaha.edu/_files/images/logo-subsite-o-2.png"
});

var testimg3 = Photo.create({
	title: "Facebook Logo",
	username: "Facebook",
	url: "https://www.facebook.com/images/fb_icon_325x325.png"
});

var testimg4 = Photo.create({
	title: "Hubble Carina Nebula",
	username: "NASA",
	url: "http://imgsrc.hubblesite.org/hu/db/images/hs-2010-13-a-1920x1200_wallpaper.jpg"
});


testPhotos.pushObject(testimg1);
testPhotos.pushObject(testimg2);
testPhotos.pushObject(testimg3);
testPhotos.pushObject(testimg4);

export default Ember.Controller.extend({
	photos: testPhotos,
	searchField: '',
	filteredPhotos: function() {
		var filter = this.get('searchField');
		var rx = new RegExp(filter, 'gi');
		var photos = this.get('photos');

		return photos.filter(function(photo){
			return photo.get('title').match(rx) || photo.get('username').match(rx);
		});
	}.property('photos', 'searchField'),
	actions: {
		search: function () {
			this.get('filteredPhotos');
		}
	}
});
