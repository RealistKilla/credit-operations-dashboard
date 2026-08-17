import { test, expect } from '@playwright/test'

test.describe('Assessments Ranking & Multi-Filter E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/assessments')
  })

  test('renders ranked qualification table and summary bar', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Assessments & Qualification Ranking')
    await expect(page.getByText('Matching')).toBeVisible()
    await expect(page.getByText('Prime / Low')).toBeVisible()
    await expect(page.getByText('Assessment Filters & Sorting')).toBeVisible()
  })

  test('filters by credit score range preset (700+ Prime)', async ({ page }) => {
    // Click 700+ preset
    await page.getByRole('button', { name: '700+' }).click()

    // Cape Foods Distributors (Score 741) should be visible
    await expect(page.getByText('Cape Foods Distributors')).toBeVisible()

    // Low score or pending businesses should be filtered out
    await expect(page.getByText('Bright Construction')).not.toBeVisible()
  })

  test('filters for thin-file accounts only', async ({ page }) => {
    // Click Thin-File checkbox
    const thinFileCheckbox = page.getByLabel(/Thin-File Accounts Only/i)
    await thinFileCheckbox.check()

    // Bright Construction should be visible
    await expect(page.getByText('Bright Construction')).toBeVisible()

    // Non-thin file accounts should not be visible
    await expect(page.getByText('Cape Foods Distributors')).not.toBeVisible()
  })
})
