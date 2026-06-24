import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print("Navigating to localhost:5173...")
        await page.goto("http://localhost:5173", wait_until="networkidle")

        print("Waiting for products to load...")
        try:
            # Wait for at least one product card to appear
            await page.wait_for_selector('h3', timeout=10000)
            print("Products loaded.")
        except Exception as e:
            print("Timeout waiting for products. Checking if there are any products...")
            content = await page.content()
            if "Nuestras Sucursales" in content:
                print("Page loaded but no products found.")

        # Take a full page screenshot
        await page.screenshot(path="/home/jules/verification/screenshots/products_verification.png", full_page=True)
        print("Screenshot saved to /home/jules/verification/screenshots/products_verification.png")
        await browser.close()

asyncio.run(main())
