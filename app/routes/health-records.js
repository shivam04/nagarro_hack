import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel(/* transition */) {
    	this.transitionTo('/health_records/disease_count'); // Implicitly aborts the on-going transition.
  	}
});
