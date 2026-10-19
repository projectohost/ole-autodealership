
const grid = document.getElementById("cars-grid");
const form = document.getElementById("car-form");
const search = document.getElementById("search");
const addButton = document.getElementById("add-button");

// Показать или скрыть форму добавления авто
addButton.addEventListener("click", () => {
    form.hidden = !form.hidden;
});

// Добавление нового автомобиля
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

    if (Number(year) < 1900 || Number(year) > 2100 || Number(price) <= 0) {
        alert("Перевірте рік випуску та ціну.");
        return;
    }

    // Создаём карточку
    const card = document.createElement("article");
    card.className = "car-card";

    // Фото автомобиля
    const img = document.createElement("img");
    img.src = image || "https://placehold.co/600x350?text=Car";
    img.alt = name;

    img.onerror = function() {
        this.onerror = null;
        this.src = "https://placehold.co/600x350?text=Car";
    };

    // Содержимое карточки
    const content = document.createElement("div");
    content.className = "car-content";

    const title = document.createElement("h2");
    title.textContent = name;

    const yearText = document.createElement("p");
    yearText.className = "car-year";
    yearText.textContent = year + " рік";

    // Характеристики
    const specs = document.createElement("div");
    specs.className = "car-specs";

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

    specs.append(
        createSpec("Двигун", engine),
        createSpec("Коробка передач", transmission)
    );

    // Цена
    const bottom = document.createElement("div");
    bottom.className = "car-bottom";

    const priceText = document.createElement("span");
    priceText.className = "price";
    priceText.textContent =
        Number(price).toLocaleString("uk-UA") + " $";

    bottom.append(priceText);

    // Собираем карточку
    content.append(title, yearText, specs, bottom);
    card.append(img, content);

    // Добавляем в начало списка
    grid.prepend(card);

    // Очищаем форму
    form.reset();
    form.hidden = true;

    // Обновляем результаты поиска
    searchCars();
});

// Поиск автомобилей
function searchCars() {
    const query = search.value.toLowerCase().trim();

    document.querySelectorAll(".car-card").forEach(card => {
        card.hidden = !card.textContent.toLowerCase().includes(query);
    });
}

search.addEventListener("input", searchCars);
