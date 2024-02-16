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

class Project {
    /*
        id: string (name with dashes)
        name: string
        date: string (month/day)
        language: string
        type: string
        context: string
        setting: string
        url: string (http path)
        images: string[] (absolute paths)
    */

    constructor(name, options) {
        const {
            date,
            language,
            type,
            context,
            setting,
            url,
            images
        } = options;

        this.id = name.replace(" ", "-");
        this.name = name;
        this.date = date;
        this.language = language;
        this.type = type;
        this.context = context;
        this.setting = setting;
        this.url = url;
        this.images = images;
    }

    createHTML(template) {
        const clone = template.content.cloneNode(true);

        const title = this.selrep(clone, "card-title");
        title.textContent = this.name;

        const image = this.selrep(clone, "photo");
        image.src = this.getPlaceholderImage();
        image.alt = `${this.name} Image`;
        //this.setCarousel(clone);

        return clone;
    }

    setCarousel(clone) {
        this.setCarouselIDs(clone);
        this.createCarouselItems(clone);
    }
    setCarouselIDs(clone) {
        const carousel = this.selrep(clone, "carousel");
        const prev = this.selrep(carousel, "carousel-previous");
        const next = this.selrep(carousel, "carousel-next");
        
        const carouselID = `#${this.getIDReplacement("carousel")}`;
        prev.setAttribute("data-bs-target", carouselID);
        next.setAttribute("data-bs-target", carouselID);
    }
    createCarouselItems(clone) {
        const carousel = this.selrep(clone, "carousel-inner");
        const itemTemplate = this.selrep(carousel, "carousel-template");

        const count = this.getRandomInt(2, 5);
        for(let i = 0; i < count; i++) {
            const item = this.createCarouselItem(itemTemplate, i == 0)
            carousel.append(item);
        }   
    }
    createCarouselItem(template, active) {
        const clone = template.content.cloneNode(true);

        

        const item = this.selrep(clone, "carousel-item");
        if(active) { item.classList.add("active"); }

        const img = this.selrep(clone, "carousel-image");
        img.src = src;
        img.alt = `${this.name} Image`;
        if(active) { img.loading = "auto"; }
        else { img.loading = "lazy"; }

        return clone;
    }
    getPlaceholderImage() {
        const rand = this.getRandomInt(350, 400);
        return `http://placekitten.com/${rand}/${rand}`; 
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
        return `${this.name}: ${this.url}`;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export { Filter, Project };