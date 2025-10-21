export const baseUrl = import.meta.env.DEV_URL
  ? import.meta.env.DEV_URL + 'api/v1'
  : 'https://qcms.mun.web.id/api/v1'

// Auth endpoints
export const login_url = '/login'
export const logout_url = '/logout'
export const refresh_url = '/refresh'
export const profile_url = '/profile'

// User endpoints
export const users_url = '/users'

// Master data endpoints
export const roles_url = '/roles'
export const positions_url = '/positions'
export const analysis_parameters_url = '/analysis-parameters'
export const categories_url = '/raw-material-categories'
export const departments_url = '/departments'
export const plant_url = '/plants'
export const raw_materials_url = '/raw-materials'
export const suppliers_url = '/supplier'
export const products_url = '/products'
export const unit_url = '/unit'
export const unit_of_measurements_url = '/unit-of-measurements'
export const parameter_url = '/parameter'
export const coa_standarization_url = '/coa-standarization'
export const delivery_partners_url = '/delivery-partner'
export const province_url = '/province'
export const city_url = '/city'
export const district_url = '/district'
export const subdistrict_url = '/subdistrict'

// Incoming materials endpoints
export const incoming_materials_url = '/incoming-raw-materials'
export const incoming_check_url = '/incoming-checks'
export const incoming_quality_checks_url = '/quality-control-checks'
export const incoming_qc_status_check =
  incoming_quality_checks_url + '/change-status'
export const incoming_coa_status_change = '/incoming-raw-materials/status'
export const incoming_lab_status_change = '/incoming-raw-materials/status'
export const incoming_coa_assessments_url = '/coa-assesment'
export const incoming_lab_assessments_url = '/coa-assesment'
export const incoming_dispositions_url = '/disposition-raw-materials'

// Quality Control endpoints
export const quality_checks_url = '/quality-control/checks'
export const quality_sampling_url = '/quality-control/sampling'
export const quality_coa_assessments_url = '/quality-control/coa-assessments'

// Laboratory endpoints
export const lab_assessments_url = '/laboratory/assessments'
export const lab_analysis_url = '/laboratory/analysis'

// Production endpoints
export const sncl_url = '/sncl'
export const dmt_url = '/dmt'

// PRODUCTION MTM
export const production_mtm_dmt_ehtg_url = '/mtm-dmt-ehtg'
export const production_mtm_amonia_url = '/mtm-amonia'
export const production_mtm_reaction_url = '/mtm-reaction'
export const production_mtm_evaporation_url = '/mtm-evaporation'
export const production_mtm_filtration_url = '/mtm-filtration'
export const production_mtm_weight_url = '/mtm-weight-material'
export const production_mtm_packing_url = '/mtm-packing'

// Warehouse endpoints

// Reports endpoints
export const reports_url = '/reports'
export const dashboard_stats_url = '/dashboard/stats'

//Packing List endpoints
export const packing_list_url = '/packing-lists'
export const release_order_url = '/release-orders'
export const delivery_order_url = '/delivery-orders'

// Plant-Solder endpoints
export const production_request_order_url = '/production-request-orders'
export const melting_process_url = '/melting'
export const mixing_process_url = '/mixing'
export const analysis_process_url = '/analyst'
export const billet_process_url = '/billet'
