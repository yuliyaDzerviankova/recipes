import { Flex, Image, Heading, Text, Box } from "@chakra-ui/react"
import type { Product } from "../../../models/Product"
import { BsFillStarFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import "./Card.css"

type Props = {
  item: Product
}

const Card = ({ item }: Props) => {
  return (
    <Link
      to={`/${item.id}`}
      className="responsive-link"
    >
    <Flex
      id={item.id.toString()}
      key={item.id}
      flexDirection="column"
      minH="370px"
      borderRadius="5px"
      background="#13293D"
      margin="10px"
      alignItems="center"
      padding="10px"
      color="#3E92CC"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.3s ease-out"
      }}
    >
      <Image src={item.image} width="50%"/>
      <Heading fontSize="22px">{item.name}</Heading>
      <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
        <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Cuisine:</Text>
        <Text textAlign="left">{item.cuisine}</Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
        <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Difficulty:</Text>
        <Text textAlign="left">{item.difficulty}</Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
        <Text alignSelf="flex-start" fontWeight="700" marginRight="5px">Tags:</Text>
        <Text
          textAlign="left"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          width="100%"
        >
          {item.tags.join(", ")}
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        width="100%"
        alignItems="center"
        flexWrap={{ base: "nowrap", md: "wrap" }}
      >
        <Text alignSelf="flex-start" textAlign="left" fontWeight="700">Meal type: </Text>
        <Text marginX="5px" textAlign="left">{item.mealType.join(", ")}</Text>
      </Box>
      <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
        <Text alignSelf="flex-start" fontWeight="700">Raiting: </Text>
        <Text marginX="5px">{item.rating}</Text>
        <BsFillStarFill color="yellow" />
      </Box>
    </Flex>
    </Link>
  )
}

export { Card }