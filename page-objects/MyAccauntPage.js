export class MyAccauntPage {
    constructor(page) {
        this.page = page
        this.pageHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto("/my-account")
    }

    waitForPageHeading = async () => {
        await this.pageHeading.waitFor()
    }

    waitforErrorMessage = async () => {
        await this.errorMessage.waitFor()
    }
}