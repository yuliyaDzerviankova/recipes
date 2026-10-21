import { Flex, Image, Heading, Text, Box, Badge, HStack, Stack } from "@chakra-ui/react"
import type { Product } from "../../models/Product"
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
      style={{ textDecoration: "none", display: "block" }}
    >
    <Flex
      id={item.id.toString()}
      flexDirection="column"
      height="480px"
      borderRadius="xl"
      background="#13293D"
      margin="10px"
      padding="10px"
      color="#F4F4F9"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s ease-in-out"
      width="100%"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl"
      }}
    >
      <Box width="100%" height="200px" position="relative" overflow="hidden" borderRadius="lg" bg="whiteAlpha.100">
        <Image src={item.image} width="100%" height="100%" objectFit="cover" />

        <HStack
          position="absolute"
          top="3"
          right="3"
          bg="blackAlpha.850"
          backdropFilter="blur(4px)"
          px="2"
          py="1"
          borderRadius="md"
          gap="1"
        >
          <BsFillStarFill color="#FFD700" size="14px" />
          <Text fontSize="sm" fontWeight="bold" color="white">{item.rating}</Text>
        </HStack>
      </Box>
      
      <Stack
        gap="3"
        p="5"
        width="100%"
        flex="1"
        justifyContent="space-between"
        align="stretch"
      >
        <Box minH="54px" display="flex" alignItems="center">
          <Heading fontSize="xl" color="#FFF" noOfLines={2} textAlign="left" width="100%">{item.name}</Heading>
        </Box>
      </Stack>

      <HStack justifyContent="space-between" fontSize="sm" color="#3E92CC">
        <Text><strong>Cuisine:</strong> {item.cuisine}</Text>
        <Text><strong>Difficulty:</strong> {item.difficulty}</Text>
      </HStack>

      <Stack align="flex-start" gap="2" width="100%" flex="1">
        <Text fontSize="xs" fontWeight="700" color="gray.400" textAlign="left">TAGS:</Text>
        <Flex flexWrap="wrap" gap="6px">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="solid"
              background="#3E92CC"
              color="white"
              borderRadius="full"
              px="2"
              py="0.5"
              fontSize="10px"
              textTransform="lowercase"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      </Stack>

      <Text
        fontSize="xs"
        color="gray.400"
        textAlign="left"
        width="100%"
        pt="2"
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
      >
        <strong>Meal type:</strong> {item.mealType.join(", ")}
      </Text>
    </Flex>
    </Link>
  )
}

export { Card }