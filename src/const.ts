/**
 * Custom File Format
 * of Maps
 */
export const FILE_FORMAT = 'map'

//////////
// Views
//

export const MAP_EDIT_VIEW = 'map-edit-view'
export const MAP_VIEW = 'map-view'

/**
 * In pixels, how big a
 * chunk is to render:
 * N * N
 */
export const MAP_CHUNK_SIZE = 160

/**
 * Storing so many chunks
 * per chunk when zooming:
 * N * N
 */
export const MAP_CHUNK_RECURSION_SIZE = 4

/**
 * Storing so many delaunay
 * polygons per chunk:
 * N * N
 */
export const MAP_CHUNK_SPLIT_DIMENSION = 16
