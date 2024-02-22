import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivateMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.withDiscountPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.cardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.cardValid = page.locator('[data-qa="valid-until"]')
        this.cardCvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')

    }

    activeDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        //option 2 for inputs slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)

        expect(await this.withDiscountPrice.isVisible()).toBe(false)
        expect(await this.discountActivateMessage.isVisible()).toBe(false)
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActivateMessage.waitFor()
        await this.totalPrice.waitFor()
        await this.withDiscountPrice.waitFor()
        const withDiscountPriceText = await this.withDiscountPrice.innerText()
        const withDiscountPriceNumber = withDiscountPriceText.replace("$", "")
        const withDiscountPriceValue = parseInt(withDiscountPriceNumber, 10)
        const totalPriceText = await this.totalPrice.innerText()
        const totalPriceNumber = totalPriceText.replace("$", "")
        const totalPriceValue = parseInt(totalPriceNumber, 10)
        expect(withDiscountPriceValue).toBeLessThan(totalPriceValue)
        
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.cardOwner.waitFor()
        await this.cardOwner.fill(paymentDetails.owner)
        await this.cardNumber.waitFor()
        await this.cardNumber.fill(paymentDetails.number)
        await this.cardValid.waitFor()
        await this.cardValid.fill(paymentDetails.validUntil)
        await this.cardCvc.waitFor()
        await this.cardCvc.fill(paymentDetails.cvc)
   } 

   completePayment = async () => {
    await this.payButton.waitFor()
    await this.payButton.click()
    await this.page.waitForURL(/\/thank-you/)
   }
}