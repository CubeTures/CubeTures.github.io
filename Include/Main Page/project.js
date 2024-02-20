class Filter {
    /*
        language: dict { string: Project[] }
        type: dict { string: Project[] }
        context: dict { string: Project[] }
        setting: dict { string: Project[] }
    */
    constructor(options) {
        const {
            language,
            type,
            context,
            setting
        } = options;

        this.filters = {};
        this.initFilters("language", language);
        this.initFilters("type", type);
        this.initFilters("context", context);
        this.initFilters("setting", setting);
    }
    initFilters(value, options) {
        this.filters[value]["all"] = new Set();
        for(const option of options) {
            this.filters[value][option] = new Set();
        }
    }

    setProjects(projects) {
        this.setFilters("language", projects);
        this.setFilters("type", projects);
        this.setFilters("context", projects);
        this.setFilters("setting", projects);
    }
    setFilters(value, projects) {
        for(const project of projects) {
            const projectValue = project[value];
            this.filters[value][projectValue].add(project);
        }
    }

    getProjects(options) {
        const {
            language,
            type,
            context,
            setting
        } = options;
        
        const results = new Set();
        results.union(this.getFilters("language", language));
        results.union(this.getFilters("type", type));
        results.union(this.getFilters("context", context));
        results.union(this.getFilters("setting", setting));

    }
    getFilters(value, options) {
        const result = new Set();
        for(const option of options) {
            const toAdd = this.filters[value][option];
            result.union(toAdd);
        }

        return result;
    }
}

//procedurally generate a new css rule for each 
const changeOnFlip = {
    ".project-card": ""
};

class Project {
    /*
        id: string (name with dashes)
        name: string
        date: string (month/day)
        language: string
        type: string
        context: string
        setting: string
        links: { string: string }
        about: string
        images: string[] (absolute paths)
        color: string
    */

    constructor(name, options) {
        const {
            date,
            language,
            type,
            context,
            setting,
            links,
            about,
            images,
            color
        } = options;

        this.id = name.replace(" ", "-");
        this.name = name;
        this.date = date;
        this.language = language;
        this.type = type;
        this.context = context;
        this.setting = setting;
        this.links = links;
        this.about = about;
        this.images = images;
        this.color = color;
    }

    createHTML(template) {
        const clone = template.content.cloneNode(true);

        const card = this.selrep(clone, "card");

        const title = this.selrep(clone, "title");
        title.addEventListener("click", () => { this.onClick(); });

        const titleText = this.selrep(clone, "card-title-text");
        titleText.textContent = this.name;

        const image = this.selrep(clone, "photo");
        image.src = this.getPlaceholderImage();
        image.alt = `${this.name} Image`;

        const about = this.selrep(clone, "about");
        about.textContent = this.about;

        this.setTags(clone);
        this.setLinks(clone);

        return clone;
    }

    onClick() {
        if(!this.card) {
            this.card = document.getElementById(this.getIDReplacement("card"));
        }

        if(this.card.classList.contains("flipped")) {
            this.card.classList.remove("flipped");
        }
        else {
            this.card.classList.add("flipped");
        }
    }
    
    getPlaceholderImage() {
        const rand = this.getRandomInt(350, 400);
        return `http://placekitten.com/${rand}/${rand}`; 
    }

    setTags(clone) {
        const tags = this.selrep(clone, "tags");

        tags.innerHTML += this.createTag(this.language);
        tags.innerHTML += this.createTag(this.type);
        tags.innerHTML += this.createTag(this.context);
        tags.innerHTML += this.createTag(this.setting);
    }
    createTag(tag) {
        return `
        <div class="tag rounded-pill">
            ${tag}
        </div>`;
    }

    setLinks(clone) {
        const links = this.selrep(clone, "links");

        for(const [ name, url ] of Object.entries(this.links)) {
            links.innerHTML += this.createLink(name, url);
        }
    }
    createLink(name, url) {
        return `
        <a type="button" class="btn btn-outline-light link"
            href="${url}">
            ${name}
        </a>`;
    }

    // select and replace
    selrep(clone, id) {
        const item = clone.querySelector(`#${id}`);
        item.id = this.getIDReplacement(id);
        return item;
    }
    getIDReplacement(id) {
        return `${this.id}-${id}`;
    }

    toString() {
        return this.name;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export { Filter, Project };