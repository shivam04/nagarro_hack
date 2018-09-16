import Component from '@ember/component';

export default Component.extend({
	didInsertElement: function(){
		let model = this.get('model');
		var data_pnt = [];
		for(var i=0;i<model.length;i++){
			data_pnt.push({y:model[i].cnt, label:model[i].address});
		}
		var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		title:{
			text: "City Count"
		},
		axisY: {
			title: "Number Of People"
		},
		data: [{        
			type: "column",  
			showInLegend: true, 
			legendMarkerColor: "grey",
			legendText: "Disease",
			dataPoints: data_pnt
		}]
	});
	chart.render();

	}
});
