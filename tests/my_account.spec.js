// import * as dotenv from "dotenv"
// dotenv.config() - imported globalSetup.js
import { test } from "@playwright/test"
import { MyAccauntPage } from "../page-objects/MyAccauntPage"
import { getLoginToken } from "../API-calls/getLoginToken"
import { adminDetails } from "../data/userDetails"

test("My accaunt using coockie injection and mocking network request", async ({page}) => {
    //make post request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    // console.warn({loginToken})
    
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "Playwright error from mocking"}),
        })
    })

    const myAccount = new MyAccauntPage(page)
    await myAccount.visit()
    await page.evaluate((loginTokenInsideBrowserCode) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitforErrorMessage()
})