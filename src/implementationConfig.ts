/* Define implementation settings */

// Prod: https://search.medieval.lib.cam.ac.uk
const api_url: string = "http://localhost"

// Specify facets to be shown in the sidebar, displayed in array order.
// wk_subjects_sm and roles_sm only return counts once the index/API expose
// them; FacetBlock hides facets with no entries in the meantime.
const desired_facets: string[] = [ 'facet-title-initial', 'lang_sm', 'ms_date_sm', 'author_sm', 'wk_subjects_sm', 'ms_materials_sm', 'ms_decotype_sm', 'ms_bindingdate_sm', 'ms_digitized_s', 'ms_repository_s', 'ms_collection_s', 'roles_sm' ]

// Sidebar facet metadata. `count` is currently unused. `expandable` controls
// whether the facet block collapses entries beyond the first 5.
const facet_key: Record<string, { name: string; count: number; expandable?: boolean }> = {
  'facet-title-initial': { name: 'Initial letter', count: 5, expandable: true },
  'author_sm': { name: 'Author', count: 5, expandable: true },
  'lang_sm': { name: 'Language', count: 5, expandable: true },
  'ms_date_sm': { name: 'Century', count: 5, expandable: true },
  'wk_subjects_sm': { name: 'Subjects', count: 5, expandable: true },
  'roles_sm': { name: 'Roles', count: 5, expandable: true },
  'ms_materials_sm': { name: 'Materials', count: 5, expandable: true },
  'ms_decotype_sm': { name: 'Decoration', count: 5, expandable: true },
  'ms_bindingdate_sm': { name: 'Binding Century', count: 5, expandable: true },
  'ms_digitized_s': { name: 'Digital Facsimile Online', count: 5, expandable: true },
  'ms_repository_s': { name: 'Repository', count: 5, expandable: true },
  'ms_collection_s': { name: 'Collection', count: 5, expandable: true },
}

// Display labels for advanced-search fieldnames. These are not facets but their
// keys appear in the query string and need a friendly name on the subQuery chip.
// This is not implemented in ms cat yet.
const advanced_param_labels: Record<string, string> = {
  'ms_title_t': 'Title',
  'name_t': 'Name',
}

const advanced_params: string[] = Object.keys(advanced_param_labels)

// `type` is the Solr field distinguishing manuscript/person/work documents;
// ?type=person etc. scope a result set to one record type.
const filter_param_labels: Record<string, string> = {
  'type': 'Type',
}

// Unified display-name lookup for any query-string key that should render with a
// friendly label (facets + advanced-search fieldnames + record-type filters).
const param_labels: Record<string, string> = {
  ...Object.fromEntries(Object.entries(facet_key).map(([k, v]) => [k, v.name])),
  ...advanced_param_labels,
  ...filter_param_labels,
}

const debug:boolean = false;

export {api_url, desired_facets, facet_key, advanced_params, param_labels, debug}
