import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static values = { url: String };

    connect() {
        this.load();
    }

    load() {
        const loader = this.element.querySelector(".loader");
        if (loader) loader.hidden = false;

        fetch(this.urlValue)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            this.element.innerHTML = html;

            if (loader) loader.hidden = true;
        })
        .catch((error) => {
            if (loader) loader.hidden = true;
        });
    }
}
