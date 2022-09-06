export default interface Organization {
  // present if user is root or admin
  orgId: string
  orgName: string
  orgLogo: string
  orgKey: string
  // present if user is root
  isRoot?: boolean
  // present if user is admin
  isAdmin?: boolean
  adminId?: string
  adminName?: string
  adminEmail?: string
  adminCell?: string
  adminTeam?: string
}