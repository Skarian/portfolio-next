const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

async function fetchContent(query) {
    // add a try / catch loop for nicer error handling
    try {
        const res = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${space}`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
                // throw our query (a string) into the body directly
                body: JSON.stringify({ query }),
            }
        )
        const { data } = await res.json()
        return data
    } catch (error) {
        // add a descriptive error message first,
        // so we know which GraphQL query caused the issue
        console.error(
            `There was a problem retrieving entries with the query ${query}`
        )
        console.error(error)
    }
}

;(async () => {
    const prettierConfig = await prettier.resolveConfig(
        './scripts/.prettierrc.js'
    )
    const response = await fetchContent(
        `
    {
      postCollection (limit: 100) {
        items {
          slug
        }
      }
    }
    `
    )
    const slugs = response.postCollection.items.map((item) => {
        return item.slug
    })

    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        'pages/**/*{.js,.mdx}',
        '!pages/_*.js',
        '!pages/api',
        '!pages/blog',
    ])
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page
                        .replace('pages', '')
                        .replace('.js', '')
                        .replace('.mdx', '')
                    const route = path === '/index' ? '' : path

                    return `
                        <url>
                            <loc>${`https://neilskaria.com${route}`}</loc>
                        </url>
                    `
                })
                .join('')}
              ${slugs
                  .map((slug) => {
                      return `
                          <url>
                              <loc>${`https://neilskaria.com/blog/${slug}`}</loc>
                          </url>
                      `
                  })
                  .join('')}
        </urlset>
    `
    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    })

    fs.writeFileSync('public/sitemap.xml', formatted)
})()
