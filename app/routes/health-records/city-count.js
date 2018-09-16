import Route from '@ember/routing/route';

export default Route.extend({
	model: function(params){
		var data = $.ajax({
			type: "POST",
			url: "http://34.199.49.88:3000/api/city",
			async: false,
			data: {disease:params.disease}
		}).responseText;
		console.log(data);
		return JSON.parse(data).data;
	}
});
