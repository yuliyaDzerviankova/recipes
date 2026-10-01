import { Flex, Input, Button, InputGroup, CloseButton } from "@chakra-ui/react"
import type { ChangeEvent, KeyboardEvent } from "react"
import { BsFillFunnelFill } from "react-icons/bs"

type Props = {
  clearSearch: () => void
  disabled: boolean
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  value: string
  searchItems: () => void
  onChange: (event: ChangeEvent<HTMLDivElement, Element>) => void
  openFilter: () => void
}

const Search = ({ clearSearch, disabled, onKeyDown, searchItems, value, onChange, openFilter }: Props) => {
  return (
  <Flex marginY="20px" width="100%" borderRadius="5px" alignSelf="flex-start" alignItems="center" flexWrap={{ md: "wrap", lg: "nowrap" }}>
    <InputGroup marginRight="10px" endElement={
      <CloseButton onClick={clearSearch} _hover={{ background: "#13293D" }} />
    }>
      <Input
        onChange={onChange}
        value={value}
        disabled={disabled}
        onKeyDown={onKeyDown}
        placeholder="Search recipe..."
        borderRadius="30px"
        border="2px solid #2A4747"
        _hover={{ borderColor: "white", transition: "border 0.3s ease-out" }}
        background="white"
        color="#13293D"
      />
    </InputGroup>
    <Flex marginTop={{ md: "10px", lg: 0 }}>
    <Button onClick={openFilter} _hover={{ background: "#13293D", color: "white" }}>
      <BsFillFunnelFill />
    </Button>
    <Button onClick={searchItems} marginLeft="10px" _hover={{ background: "#13293D", color: "white" }}>Search</Button>
    </Flex>
  </Flex>
  )
}

export { Search }