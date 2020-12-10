import { ButtonGroup, IconButton, Flex, Editable, EditableInput, EditablePreview, Stack, Center, Box} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon} from '@chakra-ui/icons'

export default function DescriptionControl({descripcionTarea}) {

  function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} onClick={onSubmit} />
        <IconButton icon={<CloseIcon />} onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="justify"
      defaultValue={descripcionTarea}
      fontSize="md"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <Stack direction="row" spacing={8}>
          <Center>
            <EditablePreview width="2xl"/>
            <EditableInput height="20" width="2xl" textOverflow="unset"/>
            <Box width="4"/>
            <EditableControls {...props} />
          </Center>
        </Stack>
      )}
    </Editable>
  )
}