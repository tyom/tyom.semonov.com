import { test } from '@playwright/test';

const PDF_PATH = 'static/tyom-semonov-cv.pdf';

// This is not test as such. This generates the PDF asset from the page.
test('Generate PDF', async ({ page }) => {
  await page.goto('/');
  await page.pdf({ path: PDF_PATH, format: 'a4' });
});
