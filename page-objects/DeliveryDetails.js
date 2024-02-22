import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.deliveryFirstName = page.locator('[data-qa="delivery-first-name"]')
        this.deliveryLastName = page.locator('[data-qa="delivery-last-name"]')
        this.deliveryStreet = page.locator('[data-qa="delivery-address-street"]')
        this.deliveryPostcode = page.locator('[data-qa="delivery-postcode"]')
        this.deliveryCity = page.locator('[data-qa="delivery-city"]')
        this.deliveryCountry = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]')
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedCity = page.locator('[data-qa="saved-address-city"]')
        this.savedCountry = page.locator('[data-qa="saved-address-country"]')
        
    }

    fillDeliveryDetails = async (userAddress) => {
        await this.deliveryFirstName.waitFor()
        await this.deliveryFirstName.fill(userAddress.firstName)
        await this.deliveryLastName.waitFor()
        await this.deliveryLastName.fill(userAddress.lastName)
        await this.deliveryStreet.waitFor()
        await this.deliveryStreet.fill(userAddress.street)
        await this.deliveryPostcode.waitFor()
        await this.deliveryPostcode.fill(userAddress.postcode)
        await this.deliveryCity.waitFor()
        await this.deliveryCity.fill(userAddress.city)
        await this.deliveryCountry.waitFor()
        await this.deliveryCountry.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedFirstName.first().waitFor()
        expect(await this.savedFirstName.first().innerText()).toBe(await this.deliveryFirstName.inputValue())
        await this.savedLastName.first().waitFor()
        expect(await this.savedLastName.first().innerText()).toBe(await this.deliveryLastName.inputValue())
        await this.savedStreet.first().waitFor()
        expect(await this.savedStreet.first().innerText()).toBe(await this.deliveryStreet.inputValue())
        await this.savedPostcode.first().waitFor()
        expect(await this.savedPostcode.first().innerText()).toBe(await this.deliveryPostcode.inputValue())
        await this.savedCity.first().waitFor()
        expect(await this.savedCity.first().innerText()).toBe(await this.deliveryCity.inputValue())
        await this.savedCountry.first().waitFor()
        expect(await this.savedCountry.first().innerText()).toBe(await this.deliveryCountry.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/)
    }
}