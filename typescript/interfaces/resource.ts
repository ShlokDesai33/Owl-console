export default interface Resource {
  // firestore id
  id: string
  // displayed on view page
  name: string
  status:  'Available' | 'Out of Service' | 'Under Maintenance'
  description: string
  applications: string[]
  limitations: string[]
  sampleRequirements: string[]
  infoDisplayFields: InfoDisplayFields[]
  prices: [{
    // determines the ppu under a certain condition
    userType: string
    // price per unit
    price: number
  }]
  org: {
    // firestore document id
    id: string
    // character count: 100 (including whitespace)
    name: string
    // amazon s3 url
    image: string
  }
  admin: {
    name: string
    email: string
    cell: string
  }
  // displayed on rent page
  // TODO
}

type InfoDisplayFields = {
  // name of field
  name: string
  content: string | string[]
}