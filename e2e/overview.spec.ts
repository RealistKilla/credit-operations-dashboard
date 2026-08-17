import { test, expect } from '@playwright/test'

test.describe('Executive Overview E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads overview KPI metrics from API', async ({ page }) => {
    // Verify title
    await expect(page.locator('h1')).toContainText('Credit Operations Overview')

    // Verify 5 KPI cards
    await expect(page.getByText('Total Businesses')).toBeVisible()
    await expect(page.getByText('Completed')).toBeVisible()
    await expect(page.getByText('High Risk')).toBeVisible()
    await expect(page.getByText('Total Turnover')).toBeVisible()
  })

  test('displays dual table layout with assessed businesses and pending queue', async ({ page }) => {
    // Assessed businesses table on left
    await expect(page.getByText(/Assessed Businesses/i)).toBeVisible()
    await expect(page.getByText('Acme Traders')).toBeVisible()

    // Pending queue table on right
    await expect(page.getByText('Pending Queue')).toBeVisible()
    await expect(page.getByText('Echo Tech Solutions')).toBeVisible()
  })

  test('navigates to business deep-dive when clicking a business row', async ({ page }) => {
    // Click Acme Traders
    await page.getByText('Acme Traders').first().click()
    await expect(page).toHaveURL(/\/businesses\/1/)
    await expect(page.locator('h1')).toContainText('Acme Traders')
  })
})
