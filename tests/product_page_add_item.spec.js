import { test, expect } from "@playwright/test"

test.skip("Product Page Add to Basket", async ({ page }) => {
  await page.goto("/")
const addToBasketButton = page.locator('[data-qa="product-button"]').first()
const basketCount = page.locator('[data-qa="header-basket-count"]')

await addToBasketButton.waitFor()
await expect(basketCount).toHaveText("0")
await expect(addToBasketButton).toHaveText("Add to Basket")

await addToBasketButton.click()

await expect(addToBasketButton).toHaveText("Remove from Basket")
await expect(basketCount).toHaveText("1")

const checkoutLink = page.getByRole('link', { name: 'Checkout' })
await checkoutLink.waitFor()
await checkoutLink.click()
await page.waitForURL("/basket")
});
