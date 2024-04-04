const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Add two products to the basket on huel.com', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    //Navigate to the Huel website
    await page.goto('https://uk.huel.com');

    //Check if the cookie consent banner is present and click the accept button
    const acceptCookieButton = await page.$('#onetrust-accept-btn-handler');
    if (acceptCookieButton) {
        await acceptCookieButton.click();
        await page.waitForSelector('#onetrust-accept-btn-handler', { state: 'hidden' });
    }

    // Click on the search bar button
    await page.click('button[aria-label="Search"]');

    //Search for 'instant meals' and click on 'Shop Instant Meal Pouches'
    await page.fill('input[data-testid="SearchBar__input"]', 'instant meals');
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    await page.waitForSelector('text = Shop Instant Meal Pouches', { timeout: 10000 });
    await page.click('text=Shop Instant Meal Pouches');

    //Select 'Mexican Chilli' flavour and add one to the basket
    await page.click('button[aria-label="Mexican Chilli Increase Quantity"]');

    //Select 'Mac & Cheeze' flavour and add one to the basket
    await page.click('button[aria-label="Mac & Cheeze Increase Quantity"]');

    //Click the continue button
    await page.click('text="Continue"');
   
    //Select 'One-time purchase' and click continue
    await page.click('#purchaseStatus-onetime');
    await page.click('text="Continue"');

    //Wait for the 'Before you go...' page to load 
    await page.waitForSelector('button.is-success[type="button"]', { timeout: 60000 });

    // Wait for the 'Continue To Basket' button to be present
    await page.waitForSelector('button:has-text("Continue To Basket")');
    await page.click('button:has-text("Continue To Basket")');
    console.log('Continue To Basket button found');

     // Wait for the 'Secure Checkout' button to be present on the basket page
    await page.waitForSelector('button[type="submit"].button__container.has-text-weight-bold', { timeout: 60000 });
    console.log('Basket page loaded');

    // Verify the basket URL
    expect(page.url()).toContain('/cart');
    console.log('Basket URL verified');

    // Click on search bar button
    await page.click('button[aria-label="Search"]');

    //Search for 'Daily Greens' and press Enter
    await page.fill('input[data-testid="SearchBar__input"]', 'Daily Greens');
    await page.keyboard.press('Enter');

    //Wait for the search results to appear
    await page.waitForSelector('text=Shop Daily Greens', { timeout: 60000 });
    await page.click('text=Shop Daily Greens');

    //Wait for the product page to load
    await page.waitForLoadState('load', { timeout: 60000 });

    // Wait for the "Add to Cart" button to be visible
    await page.waitForSelector('button.Button.Button--green.Button--is-large.Button--is-full-width', { timeout: 60000 });

    //Click on the "Add to cart" button
    await page.click('button.Button.Button--green.Button--is-large.Button--is-full-width'); 

    // Continue to the basket
    await page.click('button.is-success:has-text("Continue to basket")');


       // Verify the basket contents
       const basketItems = await page.$$eval('.item', items => items.map(item => {
        const heading = item.querySelector('.item__heading a');
        const quantity = item.querySelector('.item__quantity');

        if (heading && quantity) {
            const combinedText = `${quantity.textContent.trim()} of ${heading.textContent.trim()}`;
            console.log('Basket item:', combinedText);
            return combinedText;
        } else {
            console.log('Heading or quantity not found for item:', item.outerHTML);
            return null;
        }
    }));

    // Filter out any null values from the basketItems array
    const filteredBasketItems = basketItems.filter(item => item !== null);
    console.log('Filtered basket items:', filteredBasketItems);

    // Use regular expressions to match the expected values
    expect(filteredBasketItems.some(item => /\d+\s+bag of Huel Daily Greens/i.test(item))).toBe(true);
    expect(filteredBasketItems.some(item => /\d+\s+bags of Huel Instant Meals/i.test(item))).toBe(true);

    await browser.close();

});