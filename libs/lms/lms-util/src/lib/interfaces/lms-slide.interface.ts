export interface LmsSlide {
  id: string;
  name: string;
  description: string;
}

export type LmsSlideCreate = Omit<LmsSlide, 'id'>;
