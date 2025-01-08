import { Text, YStack, ScrollView, XStack } from 'tamagui'
import { getRelatedGuides } from '@/utilities/related'
import { ViewCount } from '@/components/ViewCount'
import { LikeCounter } from '@/components/LikeCounter'
import type { Guide } from '@/types/guide'
import { useMemo } from 'react'
import { type Href, router } from 'expo-router'

const RelatedGuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <YStack
      key={guide.id}
      padding="$4"
      borderWidth={0.5}
      borderColor="$gray10Light"
      borderRadius="$2"
      gap="$2"
      width={240}
      cursor="pointer"
      justifyContent="space-between"
      onPress={() => router.push(`/guides/${guide.id}` as Href)}
    >
      <Text
        fontWeight="bold"
        fontSize="$4"
        lineHeight="$2"
      >
        {guide.mainTask}
      </Text>
      <XStack
        gap="$2"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <ViewCount views={guide.views} />
        <LikeCounter
          guideId={guide.id}
          readOnly={true}
        />
      </XStack>
    </YStack>
  )
}

export const RelatedGuides = ({
  guides,
  currentGuide,
}: {
  guides: Guide[]
  currentGuide: Guide | null
}) => {
  const relatedGuides = useMemo(() => {
    if (!currentGuide || !guides) {
      return []
    }
    return getRelatedGuides(currentGuide.categories, guides, currentGuide.id)
  }, [currentGuide, guides])

  if (relatedGuides.length === 0) {
    return null
  }

  return (
    <YStack
      gap="$4"
      marginTop="$4"
    >
      {relatedGuides.length > 0 ? (
        <Text
          fontWeight="bold"
          fontSize="$6"
        >
          {relatedGuides.length + ' Related Guides'}
        </Text>
      ) : null}
      <ScrollView horizontal>
        <XStack gap="$4">
          {relatedGuides.map((guide) => (
            <RelatedGuideCard
              key={guide.id}
              guide={guide}
            />
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
