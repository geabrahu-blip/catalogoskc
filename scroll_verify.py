import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Navigate to local server
        await page.goto("http://localhost:5173")

        # Wait for products to load, assuming there's some kind of loading or just wait a bit
        await page.wait_for_timeout(2000)

        # Scroll down
        await page.evaluate("window.scrollBy(0, 1000)")
        await page.wait_for_timeout(1000)

        # Take screenshot
        await page.screenshot(path="/home/jules/verification/screenshots/scroll_verification.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
