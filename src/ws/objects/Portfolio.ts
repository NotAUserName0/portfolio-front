export class Portfolio {
    private _id!: number;
    private _name!: string;
    private _website!: WebSiteObject;
    private _image!: string;
    private _jobTitle!: string;
    private _description!: string;
    private _projects!: ProjectObject[];
    private _socialLinks!: LinkObject[];

    constructor(){}

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get website(): WebSiteObject {
        return this._website;
    }

    public get image(): string {
        return this._image;
    }

    public get jobTitle(): string {
        return this._jobTitle;
    }

    public get description(): string {
        return this._description;
    }

    public get projects(): ProjectObject[] {
        return this._projects;
    }

    public get socialLinks(): LinkObject[] {
        return this._socialLinks;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set website(value: WebSiteObject) {
        this._website = value;
    }

    public set image(value: string) {
        this._image = value;
    }

    public set jobTitle(value: string) {
        this._jobTitle = value;
    }

    public set description(value: string) {
        this._description = value;
    }

    public set projects(value: ProjectObject[]) {
        this._projects = value;
    }

    public set socialLinks(value: LinkObject[]) {
        this._socialLinks = value;
    }

    public JSON(): object {
        return {
            id: this._id,
            name: this._name,
            website: this._website,
            image: this._image,
            jobTitle: this._jobTitle,
            description: this._description,
            projects: this._projects,
            socialLinks: this._socialLinks
        };
    }
}

export class WebSiteObject {
    private _personalWebsite!: string;
    private _url!: string;

    constructor(){}

    public get personalWebsite(): string {
        return this._personalWebsite;
    }

    public get url(): string {
        return this._url;
    }

    public set personalWebsite(value: string) {
        this._personalWebsite = value;
    }

    public set url(value: string) {
        this._url = value;
    }

    public JSON(): object {
        return {
            personalWebsite: this._personalWebsite,
            url: this._url
        };
    }
}

export class ProjectObject {
    private _title!: string;
    private _description!: string;
    private _image!: string;
    private _tags!: string[];
    private _links!: LinkObject[];

    constructor(){}

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get image(): string {
        return this._image;
    }

    public get tags(): string[] {
        return this._tags;
    }

    public get links(): LinkObject[] {
        return this._links;
    }

    public set title(value: string) {
        this._title = value;
    }

    public set description(value: string) {
        this._description = value;
    }

    public set image(value: string) {
        this._image = value;
    }

    public set tags(value: string[]) {
        this._tags = value;
    }

    public set links(value: LinkObject[]) {
        this._links = value;
    }

    public JSON(): object {
        return {
            title: this._title,
            description: this._description,
            image: this._image,
            tags: this._tags,
            links: this._links.map(link => link.JSON())
        };
    }
}

export class LinkObject {
    private _urlName!: string;
    private _url!: string;
    private _icon!: string;

    constructor(){}

    public get urlName(): string {
        return this._urlName;
    }

    public get url(): string {
        return this._url;
    }

    public get icon(): string {
        return this._icon;
    }

    public set urlName(value: string) {
        this._urlName = value;
    }

    public set url(value: string) {
        this._url = value;
    }

    public set icon(value: string) {
        this._icon = value;
    }

    public JSON(): object {
        return {
            urlName: this._urlName,
            url: this._url,
            icon: this._icon
        };
    }
}