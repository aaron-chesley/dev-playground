export interface LmsVideo {
  id: string;
  name: string;
  description: string;
  duration: string;
  video_url: string;
  thumbnail_url: string;
}

export type LmsVideoCreate = Omit<LmsVideo, 'id'>;
