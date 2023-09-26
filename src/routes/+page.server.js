import { getData } from '$data';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return getData();
}
