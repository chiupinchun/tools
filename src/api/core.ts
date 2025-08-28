import { ref, watch, type Ref, type WatchSource } from "vue";

interface UseFetchOption<T = unknown> {
  immediate?: boolean;
  watch?: WatchSource[];
  defaultValue?: T;
}

const defaultOptions: UseFetchOption = {
  immediate: true,
  watch: [],
};

export function useFetch<T>(
  fetcher: () => Promise<T>,
  options: UseFetchOption & {
    defaultValue: T;
  }
): { data: Ref<T>; loading: Ref<boolean>; refresh: () => Promise<void> };

export function useFetch<T>(
  fetcher: () => Promise<T>,
  options?: UseFetchOption & {
    defaultValue?: undefined;
  }
): { data: Ref<T | null>; loading: Ref<boolean>; refresh: () => Promise<void> };

// -------- 實作部分 --------
export function useFetch<T>(
  fetcher: () => Promise<T>,
  options: UseFetchOption = {}
) {
  const optionsWithDefault = {
    ...defaultOptions,
    ...options,
  } as UseFetchOption<T>;

  const data = ref<T | null>(optionsWithDefault.defaultValue ?? null);
  const loading = ref(false);

  const refresh = async () => {
    loading.value = true;
    const res = await fetcher();
    data.value = res;

    loading.value = false;
  };

  if (optionsWithDefault.immediate) {
    refresh();
  }

  if (optionsWithDefault.watch) {
    watch(optionsWithDefault.watch, refresh, { deep: true });
  }

  return { data, loading, refresh };
}
