import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react"
import { Card, Pagination } from "./components"
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
    selectTag,
    totalPages,
    handlePageChange,
    currentPage,
    setCurrentPage,
  } = useProducts()

  const handleOnChange = (event: ChangeEvent<HTMLInputElement, Element>) => {
    setSearch((event.target as HTMLInputElement).value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearch("")
    setFilteredProducts(products)
    setCurrentPage(1)
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
    <Flex
      flexDirection="column"
      width="100%"
      maxW="1200px"
      mx="auto"
      p="5"
      gap="6"
    >
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
      <Box width="100%" flex="1" display="flex" justifyContent="center">
        {loading
          ? 
            <Flex width="100%" height="200px" justifyContent="center" align="center">
              <Spinner size="xl"  borderWidth="4px" />
            </Flex>
          :
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
              gap="20px"
              width="100%"
            >
              {filteredProducts.map(item => (
                <Card item={item} key={item.id} />
              ))}
            </SimpleGrid>
        }
      </Box>
      </Flex>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
    </Flex>
  )
}

export default App
