import { TupleInputProps } from '..'
import { useState } from 'react'
import { remove } from 'lodash'
import { Mapper } from './Mapper'
import Form from '../Form'

export const Tuple = ({
  input,
  argIndex,
  updateArg,
  arg,
  inputProps,
}: TupleInputProps) => {
  const [uids, setUids] = useState([
    crypto.randomUUID() ?? Math.floor(Math.random() * 10000),
  ])

  const handleRemove = (tupleIndex: number, uid: string) => {
    setUids(remove(uids, (u) => u !== uid))
    if (!arg?.length) return
    updateArg(
      argIndex,
      (arg as any[]).filter((_, i) => i !== tupleIndex)
    )
  }

  const isArray = input.type === 'tuple[]'

  return (
    <Form
      name={input.name}
      description={input.description}
      arg={arg}
      isArray={isArray}
      uids={uids}
      setUids={setUids}
    >
      {uids.map((uid, tupleIndex) => (
        <div key={uid} className="flex flex-col gap-3 relative">
          {isArray && (
            <Form.ArrayItemHeader
              name={input.name}
              index={tupleIndex}
              onRemove={() => handleRemove(tupleIndex, uid)}
            />
          )}
          {/* Run the Mapper for each member */}
          <Mapper
            inputProps={inputProps}
            tupleIndex={tupleIndex}
            updateArg={updateArg}
            argIndex={argIndex}
            arg={arg}
            input={input}
          />
        </div>
      ))}
    </Form>
  )
}
