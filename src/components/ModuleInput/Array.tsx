import { useState } from 'react'
import ModuleInput, { NonTupleArrayInputProps, setInputPropsForForm } from '.'
import { remove } from 'lodash'
import Form from './Form'

export const Array = ({
  argIndex,
  updateArg,
  inputProps,
  ...props
}: NonTupleArrayInputProps) => {
  const [uids, setUids] = useState([
    crypto.randomUUID() ?? Math.floor(Math.random() * 10000),
  ])

  const handleRemove = (arrayIndex: number, uid: string) => {
    setUids(remove(uids, (u) => u !== uid))

    if (!props.arg?.length) return

    const newArg = (props.arg as any[]).filter((_, i) => i !== arrayIndex)

    updateArg(argIndex, newArg)
  }

  const handleChange = (arrayIndex: number, value: any) => {
    const newArg = [...(props.arg ?? [])]
    newArg[arrayIndex] = value

    updateArg(argIndex, newArg)
  }

  inputProps = setInputPropsForForm(inputProps)

  return (
    <Form
      isArray
      uids={uids}
      setUids={setUids}
      name={props.input.name}
      description={props.input.description}
      arg={props.arg}
    >
      {uids.map((uid, arrayIndex) => (
        <div key={uid} className="flex flex-col gap-3 relative">
          <Form.ArrayItemHeader
            index={arrayIndex}
            onRemove={() => handleRemove(arrayIndex, uid)}
            name={props.input.name}
          />
          <ModuleInput.Basic
            inputProps={inputProps}
            pruneArrayName
            input={props.input}
            arg={props.arg?.[arrayIndex]}
            argIndex={arrayIndex}
            updateArg={handleChange}
          />
        </div>
      ))}
    </Form>
  )
}
