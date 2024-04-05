# Huel Basket Automation Test

Welcome to my Playwright script that automates the process of adding products to the basket on the Huel website (https://uk.huel.com/). This script is written in JavaScript and powered by the Playwright library for browser automation.

## My Approach

When I first received this technical task, I was excited to dive into the world of Playwright and showcase my automation skills. I started by thoroughly analysing the requirements and breaking down the test scenario into smaller, manageable steps.

I decided to use JavaScript as my language of choice since I'm quite comfortable with it, and Playwright provides excellent support for JavaScript. I structured the script in a way that follows a logical flow, making it easy to understand and maintain.

Throughout the development process, I encountered a few challenges, but I didn't let them stop me! Here are some of the hurdles I faced and how I overcame them:

1. **Handling the cookie consent banner:** The Huel website displays a cookie consent banner on the first visit, which could interfere with the automation. To tackle this, I added a check to see if the banner is present and click the accept button if necessary. This ensured a smooth automation experience.

2. **Waiting for elements to appear:** Some elements on the website took a while to load, causing the script to fail initially. I implemented appropriate waiting strategies using Playwright's `waitForSelector` and `waitForTimeout` functions to ensure the script waits for the required elements before interacting with them.

3. **Selecting specific product flavors:** The Huel website offers multiple flavors for each product, and I needed to select specific ones. I used Playwright's click interactions with precise selectors to choose the desired flavors and add them to the basket.

4. **Verifying the basket contents:** To ensure the script added the correct products to the basket, I implemented a verification step. I used Playwright's `$$eval` function to retrieve the basket items and their quantities, and then compared them against the expected values. This gave me confidence that the script was functioning as intended.

Despite the challenges, I had a lot of fun working on this project, and I must say it's also been a great Huel marketing tool, as I am now completely sold on the Daily Greens, they're going straight in my (none automated) basket! It allowed me to showcase my problem-solving skills and ability to create robust automation scripts using Playwright.


## Final Thoughts

I had a great time working on this technical task and exploring the capabilities of Playwright. It allowed me to showcase my skills in browser automation, JavaScript, and problem-solving.

I hope you find this script useful and enjoy running it as much as I enjoyed creating it. If you have any questions or suggestions, feel free to reach out.