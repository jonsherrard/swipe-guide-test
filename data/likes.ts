import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage';

function useLocalData<T>(key: string, initialData: T) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const storedData = await AsyncStorage.getItem(key);
      return storedData ? JSON.parse(storedData) as T : initialData;
    },
    initialData: initialData,
  });

  const mutation = useMutation({
    mutationFn: async (newData: T) => {
      await AsyncStorage.setItem(key, JSON.stringify(newData));
      queryClient.setQueryData([key], newData);
    }
  })

  return {
    data: query.data,
    setData: mutation.mutateAsync,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    isMutating: mutation.isPending,
  }
}


export const useLikes = (guideId: number) => {
  const key = `likes-${guideId}`
  const { data: likes, setData, isPending, isError, error, isMutating } = useLocalData<number>(key, 0);


  const incrementLikes = () => {
    if (likes !== undefined) {
      setData(likes + 1)
    }
  }

  return {
    likes,
    isPending,
    isError,
    error,
    incrementLikes,
    isMutating,
  }
}
