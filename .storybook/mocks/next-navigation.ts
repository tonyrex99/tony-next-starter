// Storybook mock for Next.js 16 App Router navigation
export const useRouter = () => ({
  push: (url: string) => {
    console.log("[Storybook Navigation] push:", url);
  },
  replace: (url: string) => {
    console.log("[Storybook Navigation] replace:", url);
  },
  prefetch: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const redirect = (url: string) => {
  console.log("[Storybook Navigation] redirect:", url);
};
export const notFound = () => {};
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];
