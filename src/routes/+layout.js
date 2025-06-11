import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_PROJECT_API_KEY } from '$env/static/public';
import '../global.css';

export const load = async () => {
  if (browser && PUBLIC_POSTHOG_PROJECT_API_KEY) {
    posthog.init(PUBLIC_POSTHOG_PROJECT_API_KEY, {
      api_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    });
  }
};

export const prerender = true;
