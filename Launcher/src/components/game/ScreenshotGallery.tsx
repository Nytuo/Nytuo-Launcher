import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

interface ScreenshotGalleryProps {
  screenshots: string[];
  video?: string;
}

/** Same carousel the website uses for a project's gallery (react-responsive-carousel). */
export function ScreenshotGallery({ screenshots, video }: ScreenshotGalleryProps) {
  if (screenshots.length === 0 && !video) return null;

  return (
    <div className="space-y-4">
      {screenshots.length > 0 && (
        <Carousel
          showArrows
          showThumbs={false}
          showStatus={false}
          infiniteLoop={screenshots.length > 1}
          useKeyboardArrows
          swipeable
          emulateTouch
          dynamicHeight={false}
          className="w-full rounded-xl overflow-hidden"
        >
          {screenshots.map((shot) => (
            <div key={shot}>
              <img
                src={shot}
                alt=""
                className="w-full h-auto max-h-[60vh] object-contain bg-black/20"
              />
            </div>
          ))}
        </Carousel>
      )}

      {video && (
        <div className="flex justify-center">
          <iframe
            title="Project video"
            src={video}
            allowFullScreen
            className="aspect-video w-full rounded-xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
