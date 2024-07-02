import {
  FormattedAbiParameter,
  NonTupleFormattedAbiParameter,
  TupleFormattedAbiParameter,
} from '@inverter-network/sdk'
import { Basic } from './Basic'
import { Tuple } from './Tuple'
import { Array } from './Array'
import { InputProps } from '@/react-daisyui'

export type UpdateArgValue = string | number | boolean | object | any[]

export type UpdateArg = (argIndex: number, argValue: UpdateArgValue) => void

type BaseProps = {
  arg: any
  updateArg: UpdateArg
  argIndex: number
  inputProps?: InputProps
}

export type NonTupleInputProps = BaseProps & {
  input: NonTupleFormattedAbiParameter
}

export type NonTupleArrayInputProps = BaseProps & {
  input: NonTupleFormattedAbiParameter
}

export type TupleInputProps = BaseProps & {
  input: TupleFormattedAbiParameter
}

type ModuleInputProps = BaseProps & {
  input: FormattedAbiParameter
}

const ModuleInput = ({
  input,
  arg,
  updateArg,
  argIndex,
  inputProps,
}: ModuleInputProps) => {
  if ('components' in input)
    return (
      <Tuple
        inputProps={inputProps}
        input={input}
        arg={arg}
        updateArg={updateArg}
        argIndex={argIndex}
      />
    )

  if (input.type.includes('[]'))
    return (
      <Array
        inputProps={inputProps}
        input={input}
        arg={arg}
        updateArg={updateArg}
        argIndex={argIndex}
      />
    )

  return (
    <Basic
      inputProps={inputProps}
      input={input}
      updateArg={updateArg}
      argIndex={argIndex}
      arg={arg ?? ''}
    />
  )
}

export default Object.assign(ModuleInput, {
  Basic,
  Tuple,
  Array,
})

export const setInputPropsForForm = (props?: InputProps) => {
  let newProps: InputProps | undefined

  if (!!props) {
    const { className, ...restInputProps } = props

    const newClassName = className?.replace(/bg-\w+-\d+/g, '!bg-base-100')

    newProps = {
      className: newClassName,
      ...restInputProps,
    }
  }

  return newProps
}
