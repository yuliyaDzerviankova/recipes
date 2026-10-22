import { Field, Input, InputGroup, type InputProps } from "@chakra-ui/react"
import { forwardRef } from "react"

type Props = Omit<InputProps, "title" | "placeholder"> & {
  title: string
  errors: boolean
  errorText?: string
  endElement: string
  placeholder: string
}

const NumberInput = forwardRef<HTMLInputElement, Props>(
({ title, errors, errorText, endElement, placeholder, ...rest }: Props, ref) => {
  return (
    <Field.Root required invalid={errors}>
      <Field.Label>
        {title} <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup endElement={endElement} width="100%">
        <Input
          ref={ref}
          {...rest}
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
})

NumberInput.displayName = "NumberInput"

export { NumberInput }