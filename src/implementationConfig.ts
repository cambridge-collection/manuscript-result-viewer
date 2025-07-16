/* Define implementation settings */

// Dev: https://mscat-dev-search.cudl-sandbox.net
const api_url: string = "https://mscat-dev-search.cudl-sandbox.net"

// Specify facets to be shown in the sidebar, displayed in array order.
const desired_facets: string[] = [ 'lang_sm', 'ms_date_sm', 'ms_datecert_s', 'ms_origin_sm', 'author_sm', 'ms_materials_sm', 'ms_decotype_sm', 'ms_music_b', 'ms_bindingdate_sm', 'ms_digitized_s', 'ms_repository_s', 'ms_collection_s' ]

// A translation table to generate the nice title/fieldnames. I don't believe count is being used.
const facet_key: Record<string, { name: string; count: number }> = {
  'author_sm': { name: 'Author', count: 5 },
  'editor_sm': { name: 'Editor', count: 5 },
  'lang_sm': { name: 'Language', count: 5 },
  'ms_date_sm': { name: 'Century', count: 5 },
  'ms_datecert_s': { name: 'Date Certainty', count: 5 },
  'ms_origin_sm': { name: 'Origin', count: 5 },
  'wk_subjects_sm': { name: 'Subjects', count: 999 },
  'ms_materials_sm': { name: 'Materials', count: 5 },
  'ms_decotype_sm': { name: 'Decoration', count: 5 },
  'ms_music_b': { name: 'Musical Notation', count: 5 },
  'ms_bindingdate_sm': { name: 'Binding Century', count: 5 },
  'ms_digitized_s': { name: 'Digital Facsimile Online', count: 5 },
  'ms_repository_s': { name: 'Repository', count: 5 },
  'ms_collection_s': { name: 'Collection', count: 5 },
  'ms_title_t': {name: 'Title', count: 5 },
  'name_t': {name: 'Name', count: 5 }
}

// Expandable facet blocks
const expandable: string[] = [
  'author',
  'editor',
  'language',
  'century',
  'date certainty',
  'origin',
  'subjects',
  'materials',
  'decoration',
  'musical notation',
  'binding century',
  'digital facsimile online',
  'repository',
  'collection',
]


// Define which variables are from the advanced search.
// These can be used to output a 'Modify search' button.
// This is not implemented in ms cat and likely will be removed from this iteration after the base code is committed.
const advanced_params = [ 'ms_title_t', 'name_t' ]

const debug:boolean = false;

export {api_url, desired_facets, facet_key, expandable, advanced_params, debug}
