import { Text } from 'tamagui'

export const CategoryPill = ({ category }: { category: string }) => {
  return (
    <Text
      key={category}
      fontSize="$1"
      paddingHorizontal="$2.5"
      bg="$accentBackground"
      paddingVertical="$1.5"
      borderRadius="$2"
    >
      {category}
    </Text>
  )
}
