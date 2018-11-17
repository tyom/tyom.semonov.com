import Vue from 'vue';
import 'vue-awesome/icons/file-pdf';
import 'vue-awesome/icons/info-circle';
import 'vue-awesome/icons/brands/github';
import 'vue-awesome/icons/brands/linkedin';
import 'vue-awesome/icons/brands/twitter';
import Icon from 'vue-awesome/components/Icon';
import VTooltip from 'v-tooltip';
import PreviewLink from '~/components/PreviewLink';

Vue.use(VTooltip);

Vue.component('v-preview-link', PreviewLink);
Vue.component('v-icon', Icon);
