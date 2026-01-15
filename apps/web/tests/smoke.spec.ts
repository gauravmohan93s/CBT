import { expect, test } from '@playwright/test'

test('login and signup pages render', async ({ page }) => {
  test.setTimeout(60_000)
  await page.goto('/login', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { name: 'Sign in to MockCBT' }),
  ).toBeVisible()

  const signupLink = page.getByRole('link', { name: /start your free trial today/i })
  await expect(signupLink).toHaveAttribute('href', '/signup')
  await page.goto('/signup', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/signup$/)
  await expect(
    page.getByRole('heading', { name: 'Create your MockCBT Account' }),
  ).toBeVisible()
})
