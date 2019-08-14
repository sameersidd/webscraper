# WebScrape API

## Scrape webpages to get their HTML in JSON format

Also allows tag search with Selectors

# To Install:
- Clone the repository
- `npm install`



# Usage

### GET Requests for front pages (eg, google.com, github.com)

```html
GET http://localhost:PORT/page/github.com
```

### POST Request for deep webpages
```json
POST http://localhost:PORT/page
Content-Type: : application/json

{
    "url": "github.com",
    "get": ["nav", "footer"]
}
```

### It takes two inputs:
 - url: For the url to scrape. Can also be a html page
 - get: the tags to get (Array)
  
## To-Do:
- Allow for deep searching with tags in the same request
- Cache the requested page to avoid many requests