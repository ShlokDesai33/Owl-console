export default interface User {
  // only present in Algolia search results
  objectID: string | null
  // only present in firestore query results
  id: string | null
  fullname: string
  image: string
  status: 'verified' | 'suspended'
}