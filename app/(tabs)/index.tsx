import { GuideCard } from '@/components/GuideCard'
import type { Guide } from '@/types/guide'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isWeb, ScrollView, Spinner, Text, YStack } from 'tamagui'
import { dataTransferObject } from '@/utilities/dto'

const baseUrl = 'http://127.0.0.1:8081'

export default function HomeScreen() {
  const queryClient = useQueryClient()
  // Fetch the data using react-query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/guides`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const guides = dataTransferObject(await response.json())
      guides.forEach((guide) => {
        queryClient.setQueryData(['guide', `guide-${guide.id}`], guide)
      })
      return guides
    },
  })

  return (
    <SafeAreaView>
      <YStack
        bg="$color1"
        mih="100%"
        gap="$4"
        f={1}
        paddingBottom="$16"
      >
        {isPending ? (
          <Spinner
            size="large"
            width={64}
            height={64}
            alignSelf="center"
            marginVertical="auto"
            color="$accentColor"
          />
        ) : isError ? (
          <Text>Error: {error?.message}</Text>
        ) : isWeb ? (
          <YStack
            width="100%"
            gap="$4"
            $gtSm={{
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
            $gtMd={{
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
            $platform-web={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
            }}
          >
            {data?.map((guide: Guide) => (
              <GuideCard
                guide={guide}
                key={guide.id}
              />
            ))}
          </YStack>
        ) : (
          <ScrollView>
            {data?.map((guide: Guide) => (
              <GuideCard
                guide={guide}
                key={guide.id}
              />
            ))}
          </ScrollView>
        )}
      </YStack>
    </SafeAreaView>
  )
}
