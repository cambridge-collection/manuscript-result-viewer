# MSCAT Search Results Viewer and Supporting Pages

A Single File Component for [Vue.JS (v3)](https://vuejs.org/) for displaying search results from MSCAT Search API. It also is capable of generating the static HTML of the About, Advanced Search and Help pages.

## Installation

1. Clone this repository
2. Run `npm install` at the root level of this repository

## Testing the Search Results

Set the `apiURL` in `./public/searchResults.config.json` to the desired non-protected search API.

If testing on locally indexed data, run [darwin-solr](https://github.com/cambridge-collection/darwin-solr) and [darwin-search](https://github.com/cambridge-collection/darwin-search) in docker on your local machine and set `apiURL` to `http://localhost`.

If testing against the live data, set `apiURL` to `https://search.darwinproject.ac.uk/`.

To run the component locally:

1. Install all dependencies using `npm install`
2. Run `npm run dev`
3. Go to <https://localhost:5173/search>. This will return the first page of all items.
4. Enter something into the search field and click search.

## Building for Deployment

The deployment is currently manual.

1. Set `apiURL` to the appropriate search api for the environment.
2. Run `npm run ssg` at the root level of this repository to build the entire site and generate static HTML for supporting pages.
3. The outputs are written to `./dist`.
4. Upload the outputs into the `./www` directory of the environment's release bucket.

**Note:** Be sure not to erase `./catalog/` in the bucket. It contains the TEI html outputs of the data build process. 

Should this directory contain additional assets, rebuilding should solve the problem.

## Notes on implementation

The code is contained within `./src`. The Single Page Application has three route (`/search`) that is dealt with by `./src/views/SearchResults.vue`. `SearchResults.vue` incorporates a number of smaller components, contained in `./src/components/` to create the view.

The supplementary pages (About, Help, Advanced Search) are stored in `./pages`. All pages with active routes will be generated into static HTML for deployment.
