import { Heading, Icon, Wrap, WrapItem } from '@chakra-ui/react';

export default function NavItem({
  title,
  icon,
  option,
  handleSelect,
  isSelected,
  route,
}) {
  return (
    <Wrap
      spacing="12px"
      w="100%"
      h="3.5em"
      justify="left"
      padding="1em"
      className={isSelected[option] === true ? 'navItem-selected' : 'navItem'}
      onClick={() => handleSelect(route)}>
      <WrapItem>
        <Icon as={icon} w={5} h={5} color="white" />
      </WrapItem>
      <WrapItem>
        <Heading as="h6" size="sm" fontWeight="medium" color="white">
          {title}
        </Heading>
      </WrapItem>
    </Wrap>
  );
}
