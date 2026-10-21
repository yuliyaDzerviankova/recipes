import { Box, createListCollection, Portal, RadioGroup, Select, Text } from "@chakra-ui/react"
import { Difficulty, type Product } from "../../models"
import { useState } from "react"

type Props = {
  handleDifficultyChange: (event) => void
  handleRateChange: (event) => void
  selectTag: (event) => void
  selectMealType: (event) => void
  products: Product[]
}

const Filter = ({ handleDifficultyChange, handleRateChange, selectTag, selectMealType, products }: Props) => {
    const [tag, setTag] = useState()
    const [mealType, setMealType] = useState()
    const [tags, setTags] = useState([])
    const [mealTypes, setMealTypes] = useState([])
  
    products?.map((item) => tags.push(...item.tags))

    const setArray = [...new Set(tags.sort())]
    const collection = createListCollection({
      items: setArray.map((item) => {
        return {
        label: item,
        value: item,
        }
      })
    })
  
    products?.map((item) => mealTypes.push(...item.mealType))
    const tagsArray = [...new Set(mealTypes.sort())]
    
    const mealTypeCollection = createListCollection({
      items: tagsArray.map((item) => {
        return {
        label: item,
        value: item,
        }
      })
    })

  return (
    <Box width="100%" textAlign="left" margin="20px" display="flex" flexWrap="wrap" gap="6">
      <Box background="#13293D" borderRadius="5px" padding="15px" color="white">
        <Text marginBottom="10px">Difficulty:</Text>
        <RadioGroup.Root>
          <RadioGroup.Item key={Difficulty.EASY} value={Difficulty.EASY} marginRight="20px" onChange={handleDifficultyChange}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{Difficulty.EASY}</RadioGroup.ItemText>
          </RadioGroup.Item>

          <RadioGroup.Item key={Difficulty.MEDIUM} value={Difficulty.MEDIUM} onChange={handleDifficultyChange}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{Difficulty.MEDIUM}</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Box>
      <Box background="#13293D" borderRadius="5px" padding="15px" color="white">
        <Text marginBottom="10px">Rate:</Text>
        <RadioGroup.Root>
          <RadioGroup.Item key="less 4.7" value="less 4.7" marginRight="20px" onChange={handleRateChange}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>less 4.7</RadioGroup.ItemText>
          </RadioGroup.Item>

          <RadioGroup.Item key="more 4.7" value="more 4.7" onChange={handleRateChange}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>more 4.7</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Box>
      <Box background="#13293D" borderRadius="5px" padding="15px" color="white" width="200px">
        <Select.Root collection={collection} onValueChange={selectTag} value={tag}>
          <Select.HiddenSelect />
          <Select.Label>Tags:</Select.Label>
          <Select.Control background="white" borderRadius="5px" color="black">
            <Select.Trigger>
              <Select.ValueText placeholder="Select tag" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collection.items.map(item => (
                  <Select.Item item={item.value} key={item.label}>
                    {item.value}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>

      <Box background="#13293D" borderRadius="5px" padding="15px" color="white" width="200px">
        <Select.Root collection={mealTypeCollection} onValueChange={selectMealType} value={mealType}>
          <Select.HiddenSelect />
          <Select.Label>Meal type:</Select.Label>
          <Select.Control background="white" borderRadius="5px" color="black">
            <Select.Trigger>
              <Select.ValueText placeholder="Select tag" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {mealTypeCollection.items.map(item => (
                  <Select.Item item={item.value} key={item.label}>
                    {item.value}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
    </Box>
  )
}

export { Filter }