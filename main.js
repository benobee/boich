import Landing from './src/modules/landing';
import Site from './src/modules/site';
import $ from 'jquery';

$(document).ready(() => {
    Site.init();
    Landing.init();
});
