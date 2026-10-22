import { Field, Input, InputGroup } from "@chakra-ui/react"

type Props = {
  title: string
  errors: boolean
  errorText?: string
  endElement: string
  placeholder: string
}

const NumberInput = ({ title, errors, errorText, endElement, placeholder }: Props) => {
  return (
    <Field.Root required invalid={!!errors}>
      <Field.Label>
        {title} <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup endElement={endElement} width="100%">
        <Input
          placeholder={placeholder}
          type="number"
          bg="white"
          color="#13293D"
          borderRadius="xl"
          min={0}
        />
      </InputGroup>
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  )
}

export { NumberInput }