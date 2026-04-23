/* Define implementation settings */

// Prod: https://search.medieval.lib.cam.ac.uk
const api_url: string = "http://localhost"

// Specify facets to be shown in the sidebar, displayed in array order.
const desired_facets: string[] = [ 'lang_sm', 'ms_date_sm', 'author_sm', 'ms_materials_sm', 'ms_decotype_sm', 'ms_bindingdate_sm', 'ms_digitized_s', 'ms_repository_s', 'ms_collection_s' ]

// A translation table to generate the nice title/fieldnames. I don't believe count is being used.
// `expandable` controls whether the facet block collapses entries beyond the first 5.
const facet_key: Record<string, { name: string; count: number; expandable?: boolean }> = {
  'author_sm': { name: 'Author', count: 5, expandable: true },
  'editor_sm': { name: 'Editor', count: 5 },
  'lang_sm': { name: 'Language', count: 5, expandable: true },
  'ms_date_sm': { name: 'Century', count: 5, expandable: true },
  'wk_subjects_sm': { name: 'Subjects', count: 999 },
  'ms_materials_sm': { name: 'Materials', count: 5, expandable: true },
  'ms_decotype_sm': { name: 'Decoration', count: 5, expandable: true },
  'ms_bindingdate_sm': { name: 'Binding Century', count: 5, expandable: true },
  'ms_digitized_s': { name: 'Digital Facsimile Online', count: 5, expandable: true },
  'ms_repository_s': { name: 'Repository', count: 5, expandable: true },
  'ms_collection_s': { name: 'Collection', count: 5, expandable: true },
  'ms_title_t': {name: 'Title', count: 5 },
  'name_t': {name: 'Name', count: 5 }
}

// Define which variables are from the advanced search.
// These can be used to output a 'Modify search' button.
// This is not implemented in ms cat and likely will be removed from this iteration after the base code is committed.
const advanced_params = [ 'ms_title_t', 'name_t' ]

const debug:boolean = false;

export {api_url, desired_facets, facet_key, advanced_params, debug}
