import { Button, Field, Flex, IconButton, Stack, Textarea } from "@chakra-ui/react"
import { LuPlus, LuTrash2 } from "react-icons/lu"

interface InstructionsInputProps {
  instructions: string[]
  setInstructions: (instructions: string[]) => void
}

const InstructionsInput = ({ instructions, setInstructions }: InstructionsInputProps) => {
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...instructions]
    updatedSteps[index] = value
    setInstructions(updatedSteps)
  }

  const handleAddStep = () => [
    setInstructions([...instructions, ""])
  ]

  const handleRemoveStep = (indexToRemove: number) => {
    if (instructions.length === 1) {
      setInstructions([""])
      return
    }
    setInstructions(instructions.filter((_, index) => index !== indexToRemove))
  }

  return (
    <Field.Root width="100%">
      <Field.Label color="gray.400" fontSize="sm" fontWeight="600" mb="3">
        Instructions / Steps
      </Field.Label>

      <Stack gap="4" width="100%">
        {instructions.map((step, index) => (
          <Flex key={index} width="100%" gap="3" alignItems="flex-start">
            <Flex
              bg="#3E92CC"
              color="white"
              borderRadius="full"
              minW="32px"
              height="32px"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="sm"
              mt="2"
            >
              {index + 1}
            </Flex>

            <Textarea
              placeholder={`Describe step ${index + 1}...`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              bg="white"
              color="#13293D"
              borderRadius="xl"
              border="2px solid"
              borderColor="#2A4747"
              rows={2}
              _focus={{ borderColor: "#3E92CC" }}
            />

            <IconButton
              aria-label="Delete step"
              onClick={() => handleRemoveStep(index)}
              variant="ghost"
              color="red.400"
              borderRadius="full"
              mt="2"
              _hover={{ bg: "red.50" }}
            >
              <LuTrash2 size="16px" />
            </IconButton>
          </Flex>
        ))}

        <Button
          onClick={handleAddStep}
          variant="outline"
          borderColor="#3E92CC"
          color="#3E92CC"
          borderRadius="full"
          width="fit-content"
          alignSelf="flex-start"
          gap="2"
          height="40px"
          _hover={{ bg: "#13293D", color: "white" }}
        >
          <LuPlus size="16px" /> Add Step
        </Button>
      </Stack>
    </Field.Root>
  )
}

export { InstructionsInput }