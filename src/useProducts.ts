import { useEffect, useState } from "react"
import type { Product } from "./models"

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
  
    useEffect(() => {
      const getProducts = async () => {
        try {
          setLoading(true)
          const response = await fetch("https://dummyjson.com/recipes?sortBy=name&order=asc")
          if (!response.ok) throw new Error("Failed to fetch")
  
          const data = await response.json()
          setProducts(data.recipes)
          setFilteredProducts(data.recipes)
        } catch (err) {
          console.log(err)
          
          return err
        } finally {
          setLoading(false)
        }
      }
  
      getProducts()
    }, [])

  const searchItems = async () => {
    const searchItem = search.toLowerCase()
    if (search.length === 0) {
      setFilteredProducts(products)
    } else {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchItem}`)
        if (!response.ok) throw new Error("Failed to fetch")
        
        const data = await response.json()
        setFilteredProducts(data.recipes)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  } 

    const selectTag = async (event) => {
    const value = event.value

    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/recipes/tag/${value}`)
      if (!response.ok) throw new Error("Failed to fetch")
      
      const data = await response.json()
      setFilteredProducts(data.recipes)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const selectMealType = async (event) => {
    const value = event.value

    try {
      const response = await fetch(`https://dummyjson.com/recipes/meal-type/${value}`)
      if (!response.ok) throw new Error("Failed to fetch")
      
      const data = await response.json()
      setFilteredProducts(data.recipes)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

    return {
      products,
      filteredProducts,
      setFilteredProducts,
      loading,
      search,
      setSearch,
      searchItems,
      selectTag,
      selectMealType,
    }
}

export { useProducts }