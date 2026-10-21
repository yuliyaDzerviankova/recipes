import { Flex, Input, Button, InputGroup, InputElement, Group } from "@chakra-ui/react"
import type { ChangeEvent, KeyboardEvent } from "react"
import { BsFillFunnelFill, BsX } from "react-icons/bs"

type Props = {
  clearSearch: () => void
  disabled: boolean
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  value: string
  searchItems: () => void
  onChange: (event: ChangeEvent<HTMLInputElement, Element>) => void
  openFilter: () => void
}

const Search = ({
    clearSearch,
    disabled,
    onKeyDown,
    searchItems,
    value,
    onChange,
    openFilter
  }: Props) => {
  return (
  <Flex
    marginY="20px"
    width="100%"
    alignSelf="flex-start"
    alignItems="center"
    gap="10px"
  >
    <InputGroup flex="1">
      <Group attached width="100%" position="relative">
        <Input
          onChange={onChange}
          value={value}
          disabled={disabled}
          onKeyDown={onKeyDown}
          placeholder="Search recipe..."
          borderRadius="full"
          border="2px solid #2A4747"
          background="white"
          color="#13293D"
          height="45px"
          _hover={{ borderColor: "#3E92CC" }}
          _focus={{ borderColor: "#3E92CC", boxShadow: "0 0 0 1px #3E92CC" }}
        />

        {value && (
          <InputElement placement="end" height="100%" display="flex" alignItems="center" pr="2">
            <BsX
              size="24px"
              color="#13293D"
              cursor="pointer"
              onClick={clearSearch}
              style={{
                borderRadius: "50%",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            />
          </InputElement>
        )}
      </Group>
    </InputGroup>
    
    <Button
      onClick={openFilter}
      borderRadius="full"
      height="45px"
      width="45px"
      background="#13293D"
      color="#3E92CC"
      _hover={{ background: "#3E92CC", color: "white" }}
    >
      <BsFillFunnelFill />
    </Button>

    <Button
      onClick={searchItems}
      borderRadius="full"
      height="45px"
      px="6"
      background="#13293D"
      color="#3E92CC"
      _hover={{ background: "#3E92CC", color: "white" }}
    >
      Search
    </Button>
  </Flex>
  )
}

export { Search }