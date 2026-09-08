export type LinkDto = {
  urlName: string
  url: string
  icon?: string | null
}

export type WebSiteDto = {
  personalWebsite: string
  url: string
}

export type ProjectDto = {
  id?: number
  name?: string
  title: string
  description: string
  image?: string | null
  file?: string | null
  tags: string[]
  links: LinkDto[]
}

export type PortfolioDto = {
  id?: number
  name: string
  website: WebSiteDto
  image?: string | null
  file?: string | null
  jobTitle: string
  description: string
  projects: ProjectDto[]
  links: LinkDto[]
  socialLinks?: LinkDto[]
}

export type ProjectLinkForm = {
  urlName: string
  url: string
}

export type LinkForm = {
  urlName: string
  url: string
  icon?: File | string | null
}

export type WebSiteForm = {
  personalWebsite: string
  url: string
}

export type ProjectForm = {
  title: string
  description: string
  image?: File | string | null
  tags: string[]
  links: ProjectLinkForm[]
}

export type PortfolioForm = {
  id?: number
  name: string
  website: WebSiteForm
  image: File | string | null
  jobTitle: string
  description: string
  projects: ProjectForm[]
  links: LinkForm[]
}