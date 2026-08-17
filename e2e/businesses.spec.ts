import { test, expect } from '@playwright/test'

test.describe('Businesses Deep-Dive & Underwriting E2E Suite', () => {
  test('renders full credit gauge and financial metrics for assessed business', async ({ page }) => {
    await page.goto('/businesses/1')

    // Profile header
    await expect(page.locator('h1')).toContainText('Acme Traders')
    await expect(page.getByText('Assessment Complete')).toBeVisible()

    // Score gauge & Financials
    await expect(page.getByText('Credit Score & Risk Profile')).toBeVisible()
    await expect(page.getByText('Bank Statement Financials')).toBeVisible()
    await expect(page.getByText('Score Category Breakdown')).toBeVisible()
  })

  test('displays thin-file warning for Bright Construction', async ({ page }) => {
    await page.goto('/businesses/2')

    await expect(page.locator('h1')).toContainText('Bright Construction')
    await expect(page.getByText(/Thin Credit File Detected/i)).toBeVisible()
  })

  test('displays pending checklist workflow for unassessed Echo Tech Solutions', async ({ page }) => {
    await page.goto('/businesses/5')

    await expect(page.locator('h1')).toContainText('Echo Tech Solutions')
    await expect(page.getByText(/Assessment Pending for Echo Tech Solutions/i)).toBeVisible()
    await expect(page.getByText('1. Statement Upload')).toBeVisible()
    await expect(page.getByText('2. Financial Indexing')).toBeVisible()
    await expect(page.getByText('3. Risk Scoring')).toBeVisible()
  })

  test('records an underwriting decision in the handover action bar', async ({ page }) => {
    await page.goto('/businesses/1')

    // Type notes and click approve
    const notesInput = page.getByPlaceholder(/Add optional underwriting rationale/i)
    await notesInput.fill('Approved with standard 6-month covenant')

    await page.getByRole('button', { name: /Approve Facility/i }).click()

    // Verify confirmation message
    await expect(page.getByText(/Credit facility approved for Acme Traders/i)).toBeVisible()
  })
})
