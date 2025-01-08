import { Text, YStack, XStack, Spinner, View } from 'tamagui'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { dataTransferObject } from '@/utilities/dto'
import { CategoryPill } from '@/components/CategoryPill'
import { ViewCount } from '@/components/ViewCount'
import { LikeCounter } from '@/components/LikeCounter'
import { RelatedGuides } from '@/components/RelatedGuides'
import type { Guide } from '@/types/guide'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

const baseUrl = 'http://127.0.0.1:8081'

export default function GuidePage() {
  const { id } = useLocalSearchParams()
  const guideId = typeof id === 'string' ? Number.parseInt(id, 10) : '0'
  const queryClient = useQueryClient()
  const guides = queryClient.getQueryData<Guide[]>(['guides'])
  // Fetch the data using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['guide', `guide-${guideId}`],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/guides/${guideId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json() as Promise<Guide>
    },
    enabled: guideId != null,
  })
  queryClient.getQueryData<Guide>(['guide', `guide-${guideId}`])
  const guide = data ? dataTransferObject([data])[0] : null

  return guide ? (
    <ScrollView style={{ margin: 0, padding: 0 }}>
      <YStack
        padding="$4"
        gap="$4"
        marginBottom="$15"
        maxWidth={660}
        width="100%"
        marginHorizontal="auto"
      >
        <Text
          fontWeight="bold"
          fontSize="$9"
          lineHeight="$8"
          textWrap="balance"
        >
          {guide.mainTask}
        </Text>
        <YStack
          maxWidth="100%"
          aspectRatio={16 / 9}
          backgroundColor="$accentBackground"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontWeight="bold"
            color="$black1"
          >
            Video
          </Text>
        </YStack>
        <XStack
          gap="$2"
          flexWrap="wrap"
        >
          {guide.categories &&
            guide.categories.map((category) => (
              <CategoryPill
                key={category}
                category={category}
              />
            ))}
        </XStack>
        <XStack
          maxWidth="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <ViewCount views={guide.views} />
          <LikeCounter guideId={guide.id} />
        </XStack>
        <XStack
          backgroundColor="$black025"
          height={1}
        />
        <Text
          fontSize="$5"
          lineHeight="$3"
        >
          {guide.mainTaskSummary}
        </Text>

        {guide.steps && guide.steps.length > 0 && (
          <YStack gap="$2">
            <Text
              fontWeight="bold"
              fontSize="$4"
            >
              Steps:
            </Text>
            {guide.steps.map((step, index) => (
              <YStack
                key={index}
                gap="$1"
              >
                <Text
                  fontWeight="bold"
                  fontSize="$3"
                >
                  {index + 1}. {step.Headline}
                </Text>
                <Text fontSize="$3">{step.Description}</Text>
              </YStack>
            ))}
          </YStack>
        )}
        {guide.tips && guide.tips.length > 0 && (
          <YStack gap="$4">
            <Text
              fontWeight="bold"
              fontSize="$6"
            >
              Tips:
            </Text>
            {guide.tips.map((tip, index) => (
              <Text
                key={index}
                fontSize="$5"
                lineHeight="$3"
              >
                {index + 1}. {tip}
              </Text>
            ))}
          </YStack>
        )}
        <RelatedGuides
          guides={guides || []}
          currentGuide={guide}
        />
      </YStack>
    </ScrollView>
  ) : (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="large" />
    </View>
  )
}
