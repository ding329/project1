import DS from 'ember-data';

export default DS.Model.extend({
	title: '',
	username: '',
	//flickr extra data
	owner: '',
	//flickr url data
	id: '',
	farm: 0,
	secret: '',
	server: '',
	url: function(){
		return "https://farm"+this.get('farm')+
		".staticflickr.com/"+this.get('server')+
		"/"+this.get('id')+"_"+this.get('secret')+"_b.jpg";
	}.property('farm','server','id','secret'),
});
