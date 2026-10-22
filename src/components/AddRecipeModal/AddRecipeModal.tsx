import { Button, CloseButton, Dialog, Field, Group, Input, InputGroup, Portal, Tag, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { BsPlusLg } from "react-icons/bs"
import { InstructionsInput } from "../InstructionsInput"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LuX } from "react-icons/lu"
import { NumberInput } from "../NumberInput"

const recipeSchema = z.object({
  title: z.string().min(3, "Name should be more than 3 symbols"),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number("Set time").min(0, "Should be positive"),
  cookTimeMinutes: z.number("Set time").min(0, "Should be positive"),
  caloriesPerServing: z.number("Set calories").min(0, "Should be positive")
})

type RecipeFormValues = z.infer<typeof recipeSchema>

const AddRecipeModal = () => {
  const [ingredientText, setIngredientText] = useState("")
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      prepTimeMinutes: undefined,
      cookTimeMinutes: undefined,
      caloriesPerServing: undefined,
      ingredients: [],
      instructions: [""]
    }
  })

  const onSubmit = async (data: RecipeFormValues) => {
    console.log("JSON: ", data)

    try {
      const response = await fetch("https://dummyjson.com//recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
      })
      .then(res => res.json())
      .then(console.log)

      await console.log(response)
    } catch (error) {
      console.log(error)
    }

    reset()
  }

  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button
          height="45px"
          background="#13293D"
          color="#3E92CC"
          borderRadius="full"
          _hover={{ background: "#3E92CC", color: "white" }}
        >
          <BsPlusLg />
          Add Recipe
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" maxH="85vh" display="flex" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Header borderBottom="1px solid" borderColor="gray">
              <Dialog.Title color="#3E92CC">Add Recipe</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body flex="1" overflow="auto" p="6" pr="4">
              <VStack gap="6">

                <Field.Root invalid={!!errors.title}>
                  <Field.Label color="gray.400" fontSize="sm" fontWeight="600">
                    Recipe Title
                  </Field.Label>
                  <Input
                    {...register("title")}
                    borderRadius="xl"
                    color="#13293D"
                    placeholder="Enter title"
                  />
                  <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.ingredients}>
                  <Field.Label color="gray.400" fontSize="sm" fontWeight="600">Ingredients</Field.Label>
                  <Controller
                    name="ingredients"
                    control={control}
                    render={({ field }) => {
                      const currentIngredients = field.value || []
                      const setIngredients = field.onChange

                      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if ((e.key === "Enter" || e.key === ",") && ingredientText.trim()) {
                          e.preventDefault()

                          if(!currentIngredients.includes(ingredientText.trim())) {
                            setIngredients([...currentIngredients, ingredientText.trim()])
                          }

                          setIngredientText("")
                        }

                        if (e.key === "Backspace" && !ingredientText && currentIngredients.length > 0) {
                          setIngredients(currentIngredients.slice(0, -1))
                        }
                      }

                      const handleRemoveIngredients = (indexToRemove: number) => {
                        setIngredients(currentIngredients.filter((_, index) => index !== indexToRemove))
                      }

                      return (
                        <Group
                          attached={false}
                          width="100%"
                          bg="white"
                          border="2px solid"
                          borderColor="#2A4747"
                          borderRadius="xl"
                          p="2"
                          gap="2"
                          flexWrap="wrap"
                          _focusWithin={{ borderColor: "#3E92CC" }}
                        >
                          {currentIngredients.map((item, index) => (
                          <Tag.Root key={index} background="#3E92CC" color="white" borderRadius="md" size="md" variant="solid">
                            <Tag.Label textTransform="none">{item}</Tag.Label>
                            <Tag.CloseTrigger
                              cursor="pointer"
                              onClick={() => handleRemoveIngredients(index)}
                              _hover={{ color: "blackAlpha.700" }}
                            >
                              <LuX size="14px" />
                            </Tag.CloseTrigger>
                          </Tag.Root>
                          ))}

                          <Input
                            placeholder={currentIngredients.length === 0 ? "Enter ingredient and press Enter..." : ""}
                            value={ingredientText}
                            onChange={(e) => setIngredientText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            border="none"
                            outline="none"
                            background="transparent"
                            _focus={{ boxShadow: "none", border: "none" }}
                            _hover={{ border: "none" }}
                            color="#13293D"
                            flex="1"
                            minW="150px"
                            height="32px"
                          />
                        </Group>
                      )
                    }}
                  />
                  <Field.ErrorText>{errors.ingredients?.message || errors.ingredients?.root?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.instructions}>
                  <Controller
                    name="instructions"
                    control={control}
                    render={({ field }) => (
                      <InstructionsInput instructions={field.value || [""]} setInstructions={field.onChange} />
                    )}
                  />
                </Field.Root>

                <Field.Root required invalid={!!errors.prepTimeMinutes}>
                  <Field.Label>
                    Prep Time <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup endElement="mins" width="100%">
                    <Input
                      {...register("prepTimeMinutes", { valueAsNumber: true })}
                      placeholder="Enter prep time"
                      type="number"
                      bg="white"
                      color="#13293D"
                      borderRadius="xl"
                      min={0}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.prepTimeMinutes?.message}</Field.ErrorText>
                </Field.Root>

                {/* <NumberInput
                  endElement="mins"
                  title="Prep Time"
                  errorText={errors.prepTimeMinutes?.message}
                  errors={!!errors.prepTimeMinutes}
                  {...register("prepTimeMinutes")}
                  placeholder="Enter prep time"
                /> */}

                <Field.Root required invalid={!!errors.cookTimeMinutes}>
                  <Field.Label>
                    Cook Time <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup endElement="mins" width="100%">
                    <Input
                      {...register("cookTimeMinutes", { valueAsNumber: true })}
                      placeholder="Enter cook time"
                      type="number"
                      bg="white"
                      color="#13293D"
                      borderRadius="xl"
                      min={0}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.cookTimeMinutes?.message}</Field.ErrorText>
                </Field.Root>

                {/* <NumberInput
                  endElement="mins"
                  title="Cook Time"
                  errorText={errors.cookTimeMinutes?.message}
                  errors={!!errors.cookTimeMinutes}
                  {...register("cookTimeMinutes")}
                  placeholder="Enter cook time"
                /> */}

                <Field.Root required invalid={!!errors.caloriesPerServing}>
                  <Field.Label>
                    Calories <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup endElement="mins" width="100%">
                    <Input
                      {...register("caloriesPerServing", { valueAsNumber: true })}
                      placeholder="Enter calories"
                      type="number"
                      bg="white"
                      color="#13293D"
                      borderRadius="xl"
                      min={0}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.caloriesPerServing?.message}</Field.ErrorText>
                </Field.Root>

                {/* <NumberInput
                  endElement="cals"
                  title="Calories"
                  errorText={errors.caloriesPerServing?.message}
                  errors={!!errors.caloriesPerServing}
                  {...register("caloriesPerServing")}
                  placeholder="Enter calories"
                /> */}
              </VStack>
            </Dialog.Body>
            <Dialog.Footer borderTop="1px solid" borderColor="gray">
              <Dialog.ActionTrigger asChild>
                <Button
                  height="45px"
                  background="#13293D"
                  color="#3E92CC"
                  borderRadius="full"
                  _hover={{ background: "#3E92CC", color: "white" }}
                  onClick={() => {
                    reset()
                    setIngredientText("")
                  }}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                height="45px"
                background="#13293D"
                color="#3E92CC"
                borderRadius="full"
                _hover={{ background: "#3E92CC", color: "white" }}
                loading={isSubmitting}
                type="submit"
              >
                Save Recipe
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export { AddRecipeModal }