import { Input } from '@/components/ui'
import utils from '@/lib/utils'
import { NonTupleInputProps } from '.'
import { useEffect } from 'react'

export const Basic = ({
  input,
  updateArg,
  arg,
  argIndex,
  pruneArrayName,
  inputProps,
}: NonTupleInputProps & {
  pruneArrayName?: boolean
}) => {
  const prunedType = input.type.startsWith('address')
    ? input.type
    : input.jsType ?? input.type

  const required =
    inputProps?.required ?? !['any', 'boolean'].includes(input.jsType!)

  const defaultProps = {
    size: 'sm' as const,
    ...inputProps,
    label: utils.format.prettyName(input.name),
    description: input.description,
    placeholder: pruneArrayName ? prunedType.replace('[]', '') : prunedType,
    [input.type === 'bool' ? 'checked' : 'value']: arg,
    required,
    onChange: (v: any) => updateArg(argIndex, v),
  }

  useEffect(() => {
    if (defaultProps.placeholder === 'boolean' && arg === '')
      defaultProps.onChange(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  switch (input.jsType) {
    case 'boolean':
      return <Input.Toggle {...defaultProps} />
    case 'numberString':
      return <Input.Number {...defaultProps} />
    default:
      return <Input.Text {...defaultProps} />
  }
}
