import { NavLink, useParams } from "react-router-dom"
import type { Product } from "../../models"
import { Flex, Text, Image, List, Heading, Spinner, Button, Box, Tag } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"

type Props = {
}

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
      <Flex width="100%" display="flex" justifyContent="center" height="100vh" alignItems="center">
        <Spinner size="xl"  borderWidth="4px" /> 
      </Flex>
    :
      <Flex flexWrap="wrap" flexDirection="column" alignItems="center" color="black" padding="25px" marginY="20px" gap="2" width="100%">
        <Box width="100%" display="flex" alignItems="center" justifyContent="flex-start">
          <NavLink to="/">
            <Button>
              <BsArrowLeft />
              Back
              </Button>
          </NavLink>
        </Box>
        <Image src={product?.image} width="300px" />
        <Heading>{product?.name}</Heading>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
          <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Prepare minutes:</Text>
          <Text>{product?.prepTimeMinutes} mins</Text>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
          <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Cook time minutes:</Text>
          <Text>{product?.cookTimeMinutes} mins</Text>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%" flexDirection="column">
          <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Ingredients:</Text>
          <List.Root as="ol" gap="2" paddingX="15px" alignSelf="flex-start" marginTop="10px">
          {product?.ingredients.map((item) => {
            return <List.Item key={item} textAlign="left" _marker={{ color: "black" }}>{item}</List.Item>
          })}
        </List.Root>
        </Box>
        <Box display="flex" justifyContent="flex-start" width="100%">
          <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Meal type:</Text>
          {product?.mealType.map((item) => (
            <Tag.Root marginRight="5px" background="white" color="black">
              <Tag.Label>{item}</Tag.Label>
            </Tag.Root>
          ))}
        </Box>
        <Text alignSelf="flex-start" fontWeight="700">Steps:</Text>
        <List.Root as="ol" gap="2" paddingX="15px" alignSelf="flex-start">
          {product?.instructions.map((item) => {
            return <List.Item key={item} textAlign="left" _marker={{ color: "black" }}>{item}</List.Item>
          })}
        </List.Root>
      </Flex>
}

export { CardDetails } 


/* 18435A
18435A
13293D
2A628F
3E92CC
*/