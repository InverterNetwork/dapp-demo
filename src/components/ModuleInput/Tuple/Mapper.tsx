import { TupleInputProps, setInputPropsForForm } from '..'
import { Basic } from '../Basic'

export type TupleMapperProps = TupleInputProps & {
  tupleIndex: number
}

export const Mapper = ({
  tupleIndex,
  updateArg,
  argIndex,
  arg,
  input,
  inputProps,
}: TupleMapperProps) => {
  inputProps = setInputPropsForForm(inputProps)

  return input.components.map((i, idx) => {
    if ('components' in i)
      return (
        <Mapper
          key={i.name}
          tupleIndex={idx}
          updateArg={updateArg}
          argIndex={argIndex}
          arg={arg}
          input={input}
        />
      )

    const { name } = i,
      tupleArg = (arg ?? {}) as Record<string, any>,
      tupleArgs = (arg ?? []) as Record<string, any>[]

    const handleUpdateArg = (argIndex: number, value: any) => {
      const newValue = { [name!]: value },
        updated = (() => {
          if (input.type === 'tuple[]') {
            const mapped = [...tupleArgs]
            mapped[tupleIndex] = { ...tupleArgs[tupleIndex], ...newValue }
            return mapped
          }

          return { ...tupleArg, ...newValue }
        })()

      updateArg(argIndex, updated)
    }

    return (
      <Basic
        inputProps={inputProps}
        key={name}
        input={i}
        arg={
          input.type === 'tuple[]'
            ? tupleArgs?.[tupleIndex]?.[name!] ?? ''
            : tupleArg?.[name!] ?? ''
        }
        argIndex={argIndex}
        updateArg={handleUpdateArg}
      />
    )
  })
}
