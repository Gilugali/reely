export interface Download {
  id: string;
  url: string;
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
  platform: string;
  downloadedAt: string;
}

export interface DownloadResponse {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  platform?: string;
  error?: string;
}

