import utils from '@/lib/utils'
import { Button, Divider, Modal } from '@/react-daisyui'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { DescriptionLabel, NameLabel } from '../ui/Input'
import { useDisclosure } from '@/hooks'
import { JsonView } from '../ui'

type FormPropsBase = {
  arg?: any
  name?: string
  description?: string
  children: React.ReactNode
}

type FormProps = FormPropsBase &
  (
    | {
        isArray: boolean
        uids: string[]
        setUids: (uids: string[]) => void
      }
    | {
        isArray?: never
        uids?: never
        setUids?: never
      }
  )

const Form = ({
  name,
  children,
  description,
  arg,
  isArray,
  uids,
  setUids,
}: FormProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const fName = utils.format.prettyName(name)

  return (
    <>
      <div className="form-control">
        <NameLabel name={fName} />
        <Button onClick={onOpen} size="sm" variant="outline" type="button">
          Form
        </Button>
        <DescriptionLabel description={description} />
      </div>

      <Modal.Legacy open={isOpen}>
        <Modal.Header className="flex justify-between items-center">
          <h3>{fName}</h3>
          <Button
            endIcon={<IoMdCloseCircleOutline size={30} />}
            color="ghost"
            className="p-0"
            onClick={onClose}
            size="sm"
            type="button"
          />
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-3">
          {!!arg && (
            <>
              <h4>Preview</h4>
              <JsonView json={arg} />
            </>
          )}
          {/* If Array add the button to add more items */}
          {isArray && (
            <Button
              color={'primary'}
              onClick={() =>
                setUids([
                  ...uids,
                  crypto.randomUUID() ?? Math.floor(Math.random() * 10000),
                ])
              }
              size="sm"
              className="mt-3"
            >
              Add More
            </Button>
          )}
          {children}
          <Button onClick={onClose} type="button">
            Done
          </Button>
        </Modal.Body>
      </Modal.Legacy>
    </>
  )
}

const ArrayItemHeader = ({
  index,
  onRemove,
  name,
}: {
  index: number
  onRemove: () => void
  name?: string
}) => (
  <>
    {index !== 0 && (
      <Button
        className="absolute top-10 right-0 p-1"
        color="ghost"
        size="sm"
        onClick={onRemove}
      >
        <IoMdCloseCircleOutline size={20} />
      </Button>
    )}

    <Divider className="mb-0">
      {utils.format.firstLetterToUpperCase(name) + ' ' + (index + 1)}
    </Divider>
  </>
)

export default Object.assign(Form, {
  ArrayItemHeader,
})
