import { chromium } from "playwright";

const browser = await chromium.launch(
    {headless: true}
)

const page = await browser.newPage()

await page.goto(
    'https://www.rappi.com.mx/restaurantes/1930170903-kuum-cafe'
)

const products = await page.$$eval(
    '.css-cxew8w',
    (results) => (
        results.map((el) => {
            const title = el
            .querySelector('h4')
            ?.innerText

            if (!title) return null

            const description = el
            .querySelector('p')
            ?.innerText

            if (!description) return null


            return {title, description}

        })
    )
)

console.log(products)
await browser.close()