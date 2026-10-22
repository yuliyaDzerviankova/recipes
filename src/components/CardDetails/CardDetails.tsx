import { NavLink, useParams } from "react-router-dom"
import type { Product } from "../../models"
import { Flex, Text, Image, List, Heading, Spinner, Button, Box, Grid, GridItem, Stack, Badge, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsArrowLeft, BsBook, BsClock } from "react-icons/bs"

type Props = {}

const CardDetails = ({}: Props) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()

        setProduct(data)
      } catch (err) {
        console.log(err)
        
        return err
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [])

  return loading 
    ? 
      <Flex width="100%" justifyContent="center" height="100vh" alignItems="center">
        <Spinner size="xl"  borderWidth="4px" color="#3E92CC" /> 
      </Flex>
    :
      <Flex
        flexDirection="column"
        alignItems="center"
        color="#F4F4F9"
        padding="25px"
        gap="6"
        width="100%"
        maxWidth="1200px"
        mx="auto"
      >
        <Box width="100%" display="flex" justifyContent="flex-start">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button
              background="#13293D"
              color="#3E92CC"
              borderRadius="full"
              borderWidth="1px solid"
              borderColor="whiteAlpha.200"
              _hover={{ background: "#3E92CC", color: "white" }}
            >
              <BsArrowLeft />
              Back
              </Button>
          </NavLink>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1.5fr" }} gap="10" width="100%">
          <GridItem>
            <Stack gap="5" position={{ md: "sticky" }} top="20px">
              <Image
                src={product?.image}
                alt={product?.name}
                width="100%"
                maxH="400px"
                objectFit="cover"
                borderRadius="2xl"
                boxShadow="xl"
              />

              <Heading as="h1" size="2xl" color="white" textAlign="left">
                {product?.name}
              </Heading>

              <Flex gap="4" bg="#13293D" p="4" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                <Flex align="center" gap="2" flex="1">
                  <BsClock color="#3E92CC" size="18px" />
                  <Box>
                    <Text fontSize="xs" color="gray.400">Prep Time</Text>
                    <Text fontWeight="bold" fontSize="sm">{product?.prepTimeMinutes} mins</Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="2" flex="1">
                  <BsClock color="#3E92CC" size="18px" />
                  <Box>
                    <Text fontSize="xs" color="gray.400">Cook Time</Text>
                    <Text fontWeight="bold" fontSize="sm">{product?.cookTimeMinutes} mins</Text>
                  </Box>
                </Flex>
              </Flex>

              <SimpleGrid columns={2} gap="3" width="100%">
                <Box bg="#13293D" p="3" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" textAlign="center">
                  <Text fontSize="xs" color="gray.400" mb="0.5">Calories</Text>
                  
                  <Text fontWeight="bold" fontSize="md" color="#3E92CC">
                    {product?.caloriesPerServing} <Text as="span" fontSize="xs" fontWeight="normal" color="white">kcal</Text>
                  </Text>
                </Box>

                <Box bg="#13293D" p="3" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100" textAlign="center">
                  <Text fontSize="xs" color="gray.400" mb="0.5">Servings</Text>
                  <Text fontWeight="bold" fontSize="md" color="#3E92CC">
                    {product?.servings} <Text as="span" fontSize="xs" fontWeight="normal" color="white">pers</Text>
                  </Text>
                </Box>
              </SimpleGrid>

              <Flex align="center" gap="2" flexWrap="wrap">
                <Text fontSize="sm" fontWeight="700" color="gray.400">Meal type:</Text>
                {product?.mealType.map((item) => (
                  <Badge key={item} bg="#3E92CC" color="white" borderRadius="full" px="3" py="0.5" textTransform="lowercase">
                    {item}
                  </Badge>
                ))} 
              </Flex>
            </Stack>
          </GridItem>

          <GridItem bg="#13293D" p={{ base: "5", md: "8" }} borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100">
            <Stack gap="8">
              <Box>
                <Heading as="h3" size="md" color="#3E92CC" mb="4" display="flex" alignItems="center" gap="2">
                  <BsBook /> Ingredients
                </Heading>

                <List.Root as="ul" gap="2" paddingLeft="20px">
                  {product?.ingredients.map((item) => {
                    return <List.Item key={item} textAlign="left" color="gray.200" fontSize="md">{item}</List.Item>
                  })}
                </List.Root>
              </Box>

              <Box>
                <Heading as="h3" size="md" color="#3E92CC" mb="4">
                  Recipe Steps
                </Heading>

                <List.Root as="ol" gap="4" paddingLeft="20px">
                  {product?.instructions.map((item) => (
                    <List.Item key={item} textAlign="left"color="gray.200" fontSize="md" _marker={{ color: "#3E92CC", fontWeight: "bold" }}>
                        {item}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>

            </Stack>
          </GridItem>

        </Grid>        
      </Flex>
}

export { CardDetails } 


/* 18435A
18435A
13293D
2A628F
3E92CC
*/