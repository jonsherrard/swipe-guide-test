import { ArrowRight, Eye } from '@tamagui/lucide-icons'
import { Button, Text, XStack, YStack } from 'tamagui'
import { CategoryPill } from './CategoryPill'
import { ViewCount } from './ViewCount'
import type { Guide } from '@/types/guide'
import { LikeCounter } from './LikeCounter'
import { router, Link, type Href } from 'expo-router'

export const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <Link
      href={guide.href as Href}
      key={guide.id}
      asChild
    >
      <YStack
        cursor="pointer"
        key={guide.id}
        padding="$4"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$2"
        gap="$4"
        scale={1}
        $platform-web={{
          width: '100%',
          gridColumn: 'span 1',
        }}
        hoverStyle={{
          scale: 1.05,
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)',
        }}
        animation="200ms"
      >
        <Text
          fontWeight="bold"
          fontSize="$8"
          textWrap="balance"
        >
          {guide.mainTask}
        </Text>

        <Text
          fontSize="$5"
          lineHeight="$3"
        >
          {guide.mainTaskSummary.split(' ').slice(0, 40).join(' ') +
            (guide.mainTaskSummary.split(' ').length > 40 ? '...' : '')}
        </Text>
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
          gap="$2"
          justifyContent="space-between"
          alignItems="center"
          marginTop="auto"
        >
          <ViewCount views={guide.views} />
          <LikeCounter
            guideId={guide.id}
            readOnly
          />
          <Button
            width="fit-content"
            marginLeft="auto"
            size="$3"
            theme="light"
            onPress={() => router.push(guide.href as Href)}
          >
            Read
            <Button.Icon>
              <ArrowRight />
            </Button.Icon>
          </Button>
        </XStack>
      </YStack>
    </Link>
  )
}
