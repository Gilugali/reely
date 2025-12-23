import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export const saveVideoToGallery = async (
  videoUrl: string,
  filename: string
): Promise<void> => {
  // Request permissions first
  const hasPermission = await requestMediaLibraryPermissions();
  if (!hasPermission) {
    throw new Error('Media library permission denied');
  }

  try {
    // Download the video file
    const fileUri = FileSystem.documentDirectory + `${filename}.mp4`;
    const downloadResult = await FileSystem.downloadAsync(videoUrl, fileUri);

    if (!downloadResult.uri) {
      throw new Error('Failed to download video file');
    }

    // Save to media library
    const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
    
    // Get or create the album
    let album = await MediaLibrary.getAlbumAsync('Social Scraper');
    if (!album) {
      album = await MediaLibrary.createAlbumAsync('Social Scraper', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    // Clean up temporary file
    try {
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
    } catch (cleanupError) {
      console.warn('Failed to cleanup temp file:', cleanupError);
    }
  } catch (error) {
    console.error('Save to gallery error:', error);
    throw error;
  }
};

