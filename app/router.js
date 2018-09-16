import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('patients', function() {});
  //this.route('patient-details', {path: '/:patient_id'});
  this.route('patient_details',{path: '/patients/:pid/:time'});
  this.route('health_records', function() {
    this.route('disease_count');
    this.route('city_count',{path: '/:disease'});
  });
});

export default Router;
