// Spoonacular API Types
export interface SpoonacularRecipe {
  id: number;
  title: string;
  image?: string;
  imageType?: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  aggregateLikes?: number;
  healthScore?: number;
  spoonacularScore?: number;
  pricePerServing?: number;
  analyzedInstructions?: any[];
  cheap?: boolean;
  creditsText?: string;
  cuisines?: string[];
  dairyFree?: boolean;
  diets?: string[];
  gaps?: string;
  glutenFree?: boolean;
  instructions?: string;
  ketogenic?: boolean;
  lowFodmap?: boolean;
  occasions?: string[];
  sustainable?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  whole30?: boolean;
  weightWatcherSmartPoints?: number;
  dishTypes?: string[];
  extendedIngredients?: SpoonacularIngredient[];
  summary?: string;
  winePairing?: any;
}

export interface SpoonacularIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: SpoonacularMeasure;
    metric: SpoonacularMeasure;
  };
}

export interface SpoonacularMeasure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface SpoonacularSearchResult {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface SpoonacularRecipeDetail extends SpoonacularRecipe {
  nutrition?: SpoonacularNutrition;
}

export interface SpoonacularNutrition {
  nutrients: SpoonacularNutrient[];
  properties: any[];
  flavonoids: any[];
  ingredients: any[];
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}

export interface SpoonacularNutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface RecipeSearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  equipment?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  instructionsRequired?: boolean;
  fillIngredients?: boolean;
  addRecipeInformation?: boolean;
  addRecipeNutrition?: boolean;
  author?: string;
  tags?: string;
  recipeBoxId?: number;
  titleMatch?: string;
  maxReadyTime?: number;
  minCarbs?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxProtein?: number;
  minCalories?: number;
  maxCalories?: number;
  minFat?: number;
  maxFat?: number;
  minAlcohol?: number;
  maxAlcohol?: number;
  minCaffeine?: number;
  maxCaffeine?: number;
  minCopper?: number;
  maxCopper?: number;
  minCalcium?: number;
  maxCalcium?: number;
  minCholine?: number;
  maxCholine?: number;
  minCholesterol?: number;
  maxCholesterol?: number;
  minFluoride?: number;
  maxFluoride?: number;
  minSaturatedFat?: number;
  maxSaturatedFat?: number;
  minVitaminA?: number;
  maxVitaminA?: number;
  minVitaminC?: number;
  maxVitaminC?: number;
  minVitaminD?: number;
  maxVitaminD?: number;
  minVitaminE?: number;
  maxVitaminE?: number;
  minVitaminK?: number;
  maxVitaminK?: number;
  minVitaminB1?: number;
  maxVitaminB1?: number;
  minVitaminB2?: number;
  maxVitaminB2?: number;
  minVitaminB5?: number;
  maxVitaminB5?: number;
  minVitaminB3?: number;
  maxVitaminB3?: number;
  minVitaminB6?: number;
  maxVitaminB6?: number;
  minVitaminB12?: number;
  maxVitaminB12?: number;
  minFiber?: number;
  maxFiber?: number;
  minFolate?: number;
  maxFolate?: number;
  minFolicAcid?: number;
  maxFolicAcid?: number;
  minIodine?: number;
  maxIodine?: number;
  minIron?: number;
  maxIron?: number;
  minMagnesium?: number;
  maxMagnesium?: number;
  minManganese?: number;
  maxManganese?: number;
  minPhosphorus?: number;
  maxPhosphorus?: number;
  minPotassium?: number;
  maxPotassium?: number;
  minSelenium?: number;
  maxSelenium?: number;
  minSodium?: number;
  maxSodium?: number;
  minSugar?: number;
  maxSugar?: number;
  minZinc?: number;
  maxZinc?: number;
  offset?: number;
  number?: number;
  limitLicense?: boolean;
  ranking?: number;
}

// App Recipe Types (normalized from Spoonacular)
export interface Recipe {
  id: string;
  title: string;
  image?: string;
  cookingTime: number;
  servings: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  cuisine?: string;
  healthScore?: number;
  pricePerServing?: number;
  readyInMinutes: number;
  aggregateLikes?: number;
  vegan?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  veryHealthy?: boolean;
  cheap?: boolean;
  veryPopular?: boolean;
  sustainable?: boolean;
  weightWatcherSmartPoints?: number;
  gaps?: string;
  lowFodmap?: boolean;
  ketogenic?: boolean;
  whole30?: boolean;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  dishTypes?: string[];
  diets?: string[];
  occasions?: string[];
  winePairing?: any;
  summary?: string;
  instructions?: string;
  extendedIngredients?: Ingredient[];
  nutrition?: Nutrition;
}

export interface Ingredient {
  id: number;
  name: string;
  nameClean?: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  image?: string;
  aisle: string;
  consistency: string;
  meta: string[];
  measures: {
    us: Measure;
    metric: Measure;
  };
}

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface SearchResult {
  recipes: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
