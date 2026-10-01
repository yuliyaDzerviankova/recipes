import { Difficulty } from "./Difficulty"

export type Product = {
  id: number
  name: string
  ingredients: []
  instructions: []
  difficulty: Difficulty
  caloriesPerServing: number
  cookTimeMinutes: number
  image: string
  prepTimeMinutes: number
  rating: number
  tags: []
  cuisine: string
  mealType: []
}