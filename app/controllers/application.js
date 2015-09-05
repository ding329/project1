import Ember from 'ember';

/*var Photo = Ember.Object.extend({
	title: '',
	username: '',
//flicker data
	owner: '',
	id: '', 
	farm: 0,
	secret: '',
	server: '',
	url: function(){
		return "https://farm"+this.get('farm')+
		".staticflickr.com/"+this.get('server')+
		"/"+this.get('id')+"_"+this.get('secret')+"_b.jpg";
	}.property('farm','server','id','secret'),
});  */

var PhotoCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
	sortProperties: ['title'],
	sortAscending: true,
	content: [],
});

export default Ember.Controller.extend(
{
	photos: PhotoCollection.create(),
	searchField: '',
	tagSearchField: '',

	filteredPhotos: function()
	{
		var filter = this.get('searchField');
		var rx = new RegExp(filter, 'gi');
		var photos = this.get('photos');

		return photos.filter(function(photo)
		{
			return photo.get('title').match(rx) || photo.get('username').match(rx);
		});
	}.property('photos.@each', 'searchField'),
	actions:
	{
		search: function ()
		{
			this.get('photos').content.clear();
			this.store.unloadAll('photo');
			this.send('getPhotos', this.get('tagSearchField'));
		},
		getPhotos: function(tag)
		{
			var apiKey = 'ca97d9ed8cedadb2e203d17214645451';
			var host = 'https://api.flickr.com/services/rest/';
			var method = "flickr.tags.getClusterPhotos";
			var requestURL = host + "?method="+method + "&api_key="+apiKey+"&tag="+tag+"&format=json&nojsoncallback=1";
			var photos = this.get('photos');
			var t = this;
			Ember.$.getJSON(requestURL, function(data)
			{
			//callback for successfully completed requests
				console.log(data);
				data.photos.photo.map(function(photo) 
				{
					var newPhotoItem = t.store.createRecord('photo',
					{
						title: photo.title,
						username: photo.username,
						//flickr extra data
						owner: photo.owner,
						//flickr url data
						id: photo.id,
						farm: photo.farm,
						secret: photo.secret,
						server: photo.server,
					});
					photos.pushObject(newPhotoItem);
				});
			});
		},
	}
});