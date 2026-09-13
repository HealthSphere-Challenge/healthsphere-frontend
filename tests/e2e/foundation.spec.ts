import { expect, test } from '@playwright/test'

test('application boots with a semantic foundation', async ({ page }) => {
  await page.goto('/'); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Application foundation ready')
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter'); await expect(page.locator('#main')).toBeFocused()
  await expect(page.getByLabel('Email address')).toBeVisible()
})
