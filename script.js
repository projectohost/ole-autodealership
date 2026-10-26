const grid = document.getElementById("cars-grid");
const form = document.getElementById("car-form");
const search = document.getElementById("search");
const addButton = document.getElementById("add-button");
const categoryButtons = document.querySelectorAll(".category");

let activeCategory = "all";

function getCarCategory(name) {
    const carName = name.toLowerCase();

    const suvKeywords = [
        "g-class", "g class", "gle", "gls", "glc",
        "x5", "x6", "x7", "rav4", "highlander",
        "land cruiser", "prado", "tahoe", "suburban",
        "explorer", "tucson", "sportage", "suv",
        "escalade", "touareg", "grand cherokee", 
        "envision", "позашляховик", "внедорожник"
    ];

    const sportKeywords = [
        "mustang", "gt-r", "gtr", "corvette",
        "supra", "rx-7", "rx-8", "350z", "370z",
        "nissan z", "camaro", "challenger",
        "charger hellcat", "911", "porsche",
        "audi r8", "ferrari", "lamborghini",
        "mclaren", "speedster", "lfa", "sport", 
        "купе", "спорткар"
    ];

    const sedanKeywords = [
        "corolla", "camry", "accord", "civic",
        "bmw m3", "bmw m5", "3 series", "5 series",
        "mercedes-benz c", "mercedes-benz e",
        "nissan maxima", "altima", "sentra",
        "dodge charger", "passat", "jetta",
        "300", "sedan", "седан"
    ];

    if (suvKeywords.some(word => carName.includes(word))) {
        return "suv";
    }

    if (sportKeywords.some(word => carName.includes(word))) {
        return "sport";
    }

    if (sedanKeywords.some(word => carName.includes(word))) {
        return "sedan";
    }

    return "other";
}

function initializeCarCategories() {
    document.querySelectorAll(".car-card").forEach(card => {
        const title = card.querySelector("h2");

        if (title) {
            card.dataset.category = getCarCategory(title.textContent);
        }
    });
}

function searchCars() {
    const query = search.value.toLowerCase().trim();

    document.querySelectorAll(".car-card").forEach(card => {
        const matchesSearch = card.textContent
            .toLowerCase()
            .includes(query);

        const matchesCategory =
            activeCategory === "all" ||
            card.dataset.category === activeCategory;

        card.hidden = !(matchesSearch && matchesCategory);
    });
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        categoryButtons.forEach(item => {
            item.classList.toggle("active", item === button);
        });

        searchCars();
    });
});

addButton.addEventListener("click", () => {
    form.hidden = !form.hidden;

    if (!form.hidden) {
        form.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

function createSpec(label, value) {
    const item = document.createElement("div");
    item.className = "spec";

    const caption = document.createElement("span");
    caption.textContent = label;

    const detail = document.createElement("strong");
    detail.textContent = value;

    item.append(caption, detail);

    return item;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("car-name").value.trim();
    const year = document.getElementById("car-year").value;
    const engine = document.getElementById("car-engine").value.trim();
    const transmission = document.getElementById("car-transmission").value.trim();
    const price = document.getElementById("car-price").value;
    const image = document.getElementById("car-image").value.trim();

    if (!name || !year || !engine || !transmission || !price) {
        alert("Будь ласка, заповніть усі обов'язкові поля.");
        return;
    }

    if (
        Number(year) < 1900 ||
        Number(year) > 2100 ||
        Number(price) <= 0
    ) {
        alert("Перевірте рік випуску та ціну.");
        return;
    }

    const card = document.createElement("article");
    card.className = "car-card";

    card.dataset.category = getCarCategory(name);

    const img = document.createElement("img");
    img.src = image || "https://placehold.co/600x350?text=Car";
    img.alt = name;

    img.onerror = function() {
        this.onerror = null;
        this.src = "https://placehold.co/600x350?text=Car";
    };

    const content = document.createElement("div");
    content.className = "car-content";

    const title = document.createElement("h2");
    title.textContent = name;

    const yearText = document.createElement("p");
    yearText.className = "car-year";
    yearText.textContent = year + " рік";

    const specs = document.createElement("div");
    specs.className = "car-specs";

    specs.append(
        createSpec("Двигун", engine),
        createSpec("Коробка передач", transmission)
    );

    const bottom = document.createElement("div");
    bottom.className = "car-bottom";

    const priceText = document.createElement("span");
    priceText.className = "price";
    priceText.textContent =
        Number(price).toLocaleString("uk-UA") + " $";

    bottom.append(priceText);

    content.append(title, yearText, specs, bottom);
    card.append(img, content);

    grid.prepend(card);

    form.reset();
    form.hidden = true;

    searchCars();
});

initializeCarCategories();

search.addEventListener("input", searchCars);

searchCars();