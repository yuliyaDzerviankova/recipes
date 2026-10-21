import { Button, Flex, Group } from "@chakra-ui/react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ 
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  if (totalPages <=1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  console.log(currentPage)

  return (
    <Flex width="100%" justifyContent="center" my="40px">
      <Group attached>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          bg="#13293D"
          color="#3E92CC"
          borderColor="#2A4747"
          borderWidth="1px"
          _hover={{ background: "#13293D", color: "white" }}
          px="3"
          height="45px"
        >
          <BsChevronLeft size="14px" />
        </Button>

        {pages.map((page) => {
          const isActive = page === currentPage

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              minW="45px"
              height="45px"
              borderColor="#2A4747"
              bg={isActive ? "#3E92CC" : "white"}
              color={isActive ? "white" : "#13293D"}
              fontWeight={isActive ? "bold" : "normal"}
              pointerEvents={isActive ? "none" : "auto"}
              _hover={{
                background: "#13293D",
                color: "white",
              }}
            >
              {page}
            </Button>
          )
        })}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          bg="#13293D"
          color="#3E92CC"
          borderColor="#2A4747"
          borderWidth="1px"
          _hover={{ background: "#13293D", color: "white" }}
          px="3"
          height="45px"
        >
          <BsChevronRight size="14px" />
        </Button>
      </Group>
    </Flex>
  )
}

export { Pagination }