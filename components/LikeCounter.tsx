import { Heart } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, XStack, Text } from 'tamagui'
import { useLikes } from '@/data/likes'

export const LikeCounter = ({
  guideId,
  readOnly = false,
}: { guideId: number; readOnly?: boolean }) => {
  const { likes = 0, incrementLikes, isMutating } = useLikes(guideId)
  const [justLiked, setJustLiked] = useState(false)

  return (
    <Button
      onPress={() => {
        incrementLikes()
        setJustLiked(true)
      }}
      disabled={isMutating || readOnly}
      size="$2"
      backgroundColor="$background"
      padding="$0"
      paddingHorizontal="$2"
      pressStyle={
        !readOnly
          ? {
              opacity: 0.8,
              scale: 1.05,
            }
          : undefined
      }
    >
      <XStack
        gap="$2"
        alignItems="flex-end"
        justifyContent="center"
      >
        {!readOnly && !justLiked && <Text fontSize="$2">Like</Text>}
        <Heart
          size={14}
          strokeWidth={3}
          color={likes > 0 ? '$red' : '$gray10'}
        />
        {justLiked || readOnly ? <Text fontSize="$2">{likes}</Text> : null}
      </XStack>
    </Button>
  )
}
