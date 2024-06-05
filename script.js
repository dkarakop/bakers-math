// ==================== Selected elements ==================== //

const ingredientsContainer = document.querySelector(".card-content");

// ==================== Ingredient Class ==================== //

/**
 * A class representing an ingredient as a list item and setting up its inner HTML.
 */
class Ingredient {
	constructor(
		name,
		percentage,
		grams,
		icon,
		editPercentage = true,
		editGrams = false
	) {
		this.name = name;
		this.icon = icon;
		this.editPercentage = editPercentage;
		this.editGrams = editGrams;

		//Creating the <li> and its inner HTML
		this.html = document.createElement("li");
		this.html.className = "ingredient";
		this.html.innerHTML = `
		<img src="images/bakers-math-${this.icon}.png" alt="Illustrated image of ${
			this.name
		}">
		${this.name}
		<input type="text" id="input-${this.name}-percentage" name="${
			this.name
		}-percentage" value="${percentage}" ${
			this.editPercentage === false ? "disabled" : ""
		}/> %
		<input type="text" id="input-${this.name}-grams" name="${
			this.name
		}-gram" value="${grams !== null ? grams : ""}" ${
			this.editGrams === false ? "disabled" : ""
		}/> gr
		`;

		this.percentageInput = this.html.querySelector(
			`#input-${this.name}-percentage`
		);
		this.gramsInput = this.html.querySelector(`#input-${this.name}-grams`);
	}
	/**
	 * Mehtod of class Ingredient which calculates the grams of an ingredient based on reference ingredient
	 * @param {} reference
	 */
	calculate(reference) {
		this.gramsInput.value =
			(this.percentageInput.value / 100) * reference.gramsInput.value;
	}
}

// ==================== Ingredients Array  ==================== //

const ingredients = [
	new Ingredient("flour", 100, 500, "flour", false, true),
	new Ingredient("water", 65, null, "water"),
	new Ingredient("salt", 1.5, null, "salt"),
	new Ingredient("sourdough", 30, null, "sourdough"),
];

// ======================= Functions  ======================= //

/**
 * This function creates an unordered list of ingredients.
 * @param {*} ingredients The array of the ingredients.
 */
function createIngredientList(ingredients) {
	// Create the list
	const ingedientsList = document.createElement("ul");
	ingedientsList.classList.add("ingredients-list");
	ingredientsContainer.appendChild(ingedientsList);
	// Add ingredients
	for (const ingredient of ingredients) {
		ingedientsList.appendChild(ingredient.html);
	}
}

/**
 * This function calculates the amount of each ingredient, based on the flour's amount (reference ingredient).
 * @param {*} ingredients The array of the ingredients.
 */
function calculateAmounts(ingredients) {
	const flour = ingredients.find(
		(ingredient) => ingredient.name.toLowerCase() === "flour"
	);
	for (const ingredient of ingredients) {
		ingredient.calculate(flour);
	}
}

// ==================== App Start  ==================== //

createIngredientList(ingredients);
calculateAmounts(ingredients);

// ==================== Add Calculate Button  ==================== //

const btn = document.createElement("button");
btn.classList.add("btn-calculate");
btn.innerText = "Calculate";
ingredientsContainer.appendChild(btn);
btn.addEventListener("click", () => {
	calculateAmounts(ingredients);
});
