export const LMS_CONTENT_TYPES = ['VIDEO', 'SLIDE'] as const;

export type LmsContentType = typeof LMS_CONTENT_TYPES[number];
