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

grid.addEventListener("click", function (event) {
    const card = event.target.closest(".car-card");
    if (!card) return;

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

const carDetails = {
    "Toyota Corolla": {
        engineType: "Гибридный 4-циліндровий",
        fuel: "Бензин + електроенергія",
    },

    "Ford Mustang": {
        engineType: "Атмосферный V6",
        fuel: "Бензин",
    },

    "Dodge Charger SRT": {
        engineType: "Атмосферный V8",
        fuel: "Бензин",
    },

    "BMW M3": {
        engineType: "Турбированный 6-циліндровий",
        fuel: "Бензин",
    },

    "Mercede-Benz G-Class": {
        engineType: "Бітурбіруванный V8",
        fuel: "Бензин",
    },

    "Nissan GT-R": {
        engineType: "Турбированный V6",
        fuel: "Бензин",
    },

    "Open Speedster": {
        engineType: "Атмосферный 4-циліндровий",
        fuel: "Бензин",
    },

    "Jeep Grand Cherokee": {
        engineType: "Атмосферный V8",
        fuel: "Бензин",
    },

    "Cadillac Escalade": {
        engineType: "Атмосферный V8",
        fuel: "Бензин",
    },

    "Lamborghini Huracán": {
        engineType: "Атмосферный V10",
        fuel: "Бензин",
    },

    "Honda Accord": {
        engineType: "Атмосферный V6",
        fuel: "Бензин",
    },

    "Lexus LFA": {
        engineType: "Атмосферный V10",
        fuel: "Бензин",
    },

    "Buick Envision": {
        engineType: "Турбованний 4-циліндровий",
        fuel: "Бензин",
    },

    "Chrysler 300": {
        engineType: "Атмосферный V6",
        fuel: "Бензин",
    }
};

// Защита текста от вставки HTML.
function safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Обработка нажатия на карточку автомобиля.
grid.addEventListener("click", function(event) {
    const card = event.target.closest(".car-card");

    if (!card || !grid.contains(card)) return;

    const name = card.querySelector("h2")?.textContent.trim() || "Автомобиль";
    const image = card.querySelector("img")?.src || "";
    const year = card.querySelector(".car-year")?.textContent.trim() || "Не указан";
    const price = card.querySelector(".price")?.textContent.trim() || "Не указана";
    const catalogUrl = window.location.href;

    // Получаем дополнительные характеристики.
    const details = carDetails[name] || {
        engineType: "Не вказано",
        fuel: "Не вказано",
    };

    // Открываем новую вкладку.
    const newTab = window.open("", "_blank");

    if (!newTab) {
        return;
    }

    // Создаём страницу автомобиля.
    newTab.document.open();

    newTab.document.write(`
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Oswald:wght@400;500;600&display=swap" rel="stylesheet">
    <title>${safe(name)} | Vehicle-Buys</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Oswald", sans-serif;
            min-height: 100vh;
            color: white;

            background:
                linear-gradient(rgba(10, 10, 10, 0.88), rgba(10, 10, 10, 0.94)),
                url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQskavUt7KAoQQG9fr6NaQQDfq8nzmuZ9_Pwa32rslJ262yBibMx4va4&s=10");

            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        .header {
            width: 100%;
            padding: 25px 7%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .logo {
            font-size: 27px;
            font-weight: bold;
            color: white;
        }

        .back-link {
            color: white;
            text-decoration: none;
            border: 1px solid #ff6b00;
            padding: 11px 20px;
            border-radius: 6px;
            transition: 0.3s;
        }

        .back-link:hover {
            background: #ff6b00;
        }

        .container {
            max-width: 1200px;
            margin: 60px auto;
            padding: 0 25px;
        }

        .car-title {
            font-size: 38px;
            margin-bottom: 35px;
        }

        .car-title span {
            color: #ff6b00;
        }

        .content {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
            align-items: start;
        }

        .car-photo {
            background: rgba(255,255,255,0.05);
            padding: 12px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .car-photo img {
            width: 100%;
            height: 475px;
            object-fit: cover;
            border-radius: 9px;
            display: block;
        }

        .car-info {
            background: rgba(20,20,20,0.88);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 28px;
        }

        .car-info h2 {
            font-size: 25px;
            margin-bottom: 25px;
            color: #ff6b00;
        }

        .spec {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 17px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .spec-icon {
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255,107,0,0.13);
            border-radius: 9px;
            font-size: 22px;
            flex-shrink: 0;
        }

        .spec-text {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .spec-text span {
            color: #999;
            font-size: 13px;
        }

        .spec-text strong {
            font-size: 16px;
        }

        .price {
            margin-top: 25px;
            font-size: 30px;
            font-weight: bold;
            color: #ff6b00;
        }

        .year {
            margin-top: 8px;
            color: #aaa;
        }

        @media (max-width: 800px) {
            .content {
                grid-template-columns: 1fr;
            }

            .car-title {
                font-size: 29px;
            }

            .car-photo img {
                height: 260px;
            }

            .header {
                padding: 20px;
            }

            .container {
                margin: 35px auto;
            }
        }

        @media (max-width: 450px) {
            .logo {
                font-size: 21px;
            }

            .back-link {
                padding: 9px 12px;
                font-size: 13px;
            }

            .car-info {
                padding: 20px;
            }
        }
    </style>
</head>

<body>

    <header class="header">
        <div class="logo">Vehicle-Buys</div>
        <a class="back-link" href="${safe(catalogUrl)}">
            ← Назад к каталогу
        </a>
    </header>

    <main class="container">

        <h1 class="car-title">
            ${safe(name)} <span>— характеристики</span>
        </h1>

        <div class="content">

            <div class="car-photo">
                <img src="${safe(image)}" alt="${safe(name)}">
            </div>

            <div class="car-info">

                <h2>Інформація про автомобіль</h2>

                <div class="spec">
                    <div class="spec-icon">📅</div>
                    <div class="spec-text">
                        <span>Дата випуска</span>
                        <strong>${safe(year)}</strong>
                    </div>
                </div>

                <div class="spec">
                    <div class="spec-icon">🔩</div>
                    <div class="spec-text">
                        <span>Тип двигуна</span>
                        <strong>${safe(details.engineType)}</strong>
                    </div>
                </div>

                <div class="spec">
                    <div class="spec-icon">⛽</div>
                    <div class="spec-text">
                        <span>Тип палива</span>
                        <strong>${safe(details.fuel)}</strong>
                    </div>
                </div>

                <div class="price">
                    ${safe(price)}
                </div>

                <div class="year">
                    Vehicle-Buys
                </div>

            </div>
        </div>
    </main>

</body>
</html>
    `);

    newTab.document.close();
    })
});