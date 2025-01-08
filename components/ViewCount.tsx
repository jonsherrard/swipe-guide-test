import { Eye } from '@tamagui/lucide-icons'
import { Text, XStack } from 'tamagui'
import { formatNumber } from '@/utilities/formatting'

export const ViewCount = ({ views }: { views: number }) => {
  return views > 0 ? (
    <XStack
      gap="$2"
      alignItems="center"
    >
      <Eye
        size={16}
        strokeWidth={1}
      />
      <Text fontSize="$2">{formatNumber(views)} Views</Text>
    </XStack>
  ) : null
}
