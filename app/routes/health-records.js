import Route from '@ember/routing/route';

export default Route.extend({
	model: function(){
		var data = $.ajax({
			type: "GET",
			url: "http://34.199.49.88:3000/api/all_diseases",
			async: false,
		}).responseText;
		console.log(data);
		return JSON.parse(data).data;
	}
});
