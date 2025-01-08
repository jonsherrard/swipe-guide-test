import { GuideCard } from '@/components/GuideCard'
import type { Guide } from '@/types/guide'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Spinner, YStack } from 'tamagui'

export default function FavoritesScreen() {
  const queryClient = useQueryClient()
  const guides = queryClient.getQueryData<Guide[]>(['guides'])
  const [likedGuides, setLikedGuides] = useState<Guide[]>([])

  useEffect(() => {
    const fetchLikedGuides = async () => {
      if (guides) {
        const likedGuidesList = []
        for (const guide of guides) {
          const likesKey = `likes-${guide.id}`
          const likes = await AsyncStorage.getItem(likesKey)
          if (likes && JSON.parse(likes) > 0) {
            likedGuidesList.push(guide)
          }
        }
        setLikedGuides(likedGuidesList)
      }
    }
    fetchLikedGuides()
  }, [guides])

  return (
    <SafeAreaView>
      <YStack
        bg="$color1"
        mih="100%"
        gap="$4"
        f={1}
        paddingBottom="$16"
      >
        {!guides ? (
          <Spinner
            size="large"
            width={64}
            height={64}
            alignSelf="center"
            marginVertical="auto"
            color="$accentColor"
          />
        ) : (
          <ScrollView>
            {likedGuides.map((guide: Guide) => (
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
