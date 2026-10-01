import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Flex, Spinner } from "@chakra-ui/react"
import { Card } from "./components/common"
import { useProducts } from "./useProducts"
import { Search } from "./components"
import { Filter } from "./components/Filter/Filter"

function App() {
  const [openFilter, setOpenFilter] = useState(false)

  const {
    filteredProducts,
    loading,
    products,
    search,
    setSearch,
    searchItems,
    setFilteredProducts,
    selectMealType,
    selectTag
  } = useProducts()

  const handleOnChange = (event: ChangeEvent<HTMLDivElement, Element>) => setSearch((event.target as HTMLInputElement).value)

  const clearSearch = () => {
    setSearch("")
    setFilteredProducts(products)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchItems()
    }
  }

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
    setFilteredProducts(products)
  }

  const handleDifficultyChange = (event: ChangeEvent<HTMLDivElement, Element>) => {
    const filtered = products?.filter((item) => item.difficulty === (event.target as HTMLInputElement).value)
    setFilteredProducts(filtered)
  }

  const handleRateChange = (event: ChangeEvent<HTMLDivElement, Element>) => {
    const value = (event.target as HTMLInputElement).value

    if (value === "more 4.7") {
      const filtered = products?.filter((item) => item.rating >= 4.7)
      setFilteredProducts(filtered)
    } else {
      const filtered = products?.filter((item) => item.rating < 4.7)
      setFilteredProducts(filtered)
    }
  }
  
  
  return (
    <Flex flex="1" justifyContent="center" alignItems={loading ? "flex-start" : "center"} width="100%" flexWrap="wrap">
      <Search
        clearSearch={clearSearch}
        disabled={loading}
        onKeyDown={handleKeyDown}
        value={search}
        searchItems={searchItems}
        onChange={handleOnChange}
        openFilter={handleOpenFilter}
      /> 
      {openFilter && (
        <Filter
          handleDifficultyChange={handleDifficultyChange}
          handleRateChange={handleRateChange}
          products={products}
          selectTag={selectTag}
          selectMealType={selectMealType}
        />
      )}
      <Flex>
      {loading 
        ? 
          <Spinner size="xl"  borderWidth="4px" /> 
        :
          <Flex flexDirection="row" flex="1" width="100%" flexWrap="wrap" justifyContent="space-between">
            {filteredProducts.map(item => (
              <Card item={item} key={item.id} />
            ))}
          </Flex>
      }
      </Flex>
      
    </Flex>
  )
}

export default App
