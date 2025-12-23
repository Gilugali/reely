import { saveVideoToGallery } from '@/src/services/mediaService';
import { useDownloadStore } from '@/src/store/downloadStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Mock data for preview
const MOCK_DOWNLOADS = [
  {
    id: 'mock-1',
    url: 'https://instagram.com/reel/abc123',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://picsum.photos/400/400?random=1',
    title: 'Amazing Dance Challenge Video',
    platform: 'instagram',
    downloadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'mock-2',
    url: 'https://tiktok.com/@user/video/123',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://picsum.photos/400/400?random=2',
    title: 'Funny Cat Compilation',
    platform: 'tiktok',
    downloadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'mock-3',
    url: 'https://youtube.com/shorts/xyz789',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnailUrl: 'https://picsum.photos/400/400?random=3',
    title: 'Cooking Tips and Tricks',
    platform: 'youtube',
    downloadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: 'mock-4',
    url: 'https://instagram.com/reel/def456',
    videoUrl: 'https://example.com/video4.mp4',
    thumbnailUrl: 'https://picsum.photos/400/400?random=4',
    title: 'Travel Vlog: Paris Adventures',
    platform: 'instagram',
    downloadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: 'mock-5',
    url: 'https://tiktok.com/@user/video/456',
    videoUrl: 'https://example.com/video5.mp4',
    thumbnailUrl: 'https://picsum.photos/400/400?random=5',
    title: 'Quick Workout Routine',
    platform: 'tiktok',
    downloadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
];

export default function LibraryScreen() {
  const downloads = useDownloadStore((state) => state.downloads);
  const addDownload = useDownloadStore((state) => state.addDownload);
  const [savingVideo, setSavingVideo] = useState<string | null>(null);

  // Add mock data on mount if downloads is empty (for preview only)
  useEffect(() => {
    if (downloads.length === 0) {
      MOCK_DOWNLOADS.forEach((mock) => {
        addDownload(mock);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveToGallery = async (download: typeof downloads[0]) => {
    if (savingVideo) return;

    setSavingVideo(download.id);
    try {
      await saveVideoToGallery(download.videoUrl, download.title);
      Alert.alert('Success', 'Video saved to gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save video to gallery');
      console.error('Save error:', error);
    } finally {
      setSavingVideo(null);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Video',
      'Are you sure you want to delete this video?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            useDownloadStore.getState().removeDownload(id);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: typeof downloads[0] }) => {
    const isSaving = savingVideo === item.id;

    return (
      <View style={styles.videoCard}>
        <Image
          source={
            item.thumbnailUrl
              ? { uri: item.thumbnailUrl }
              : require('../../assets/images/icon-192.png')
          }
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.videoPlatform}>{item.platform}</Text>
          <Text style={styles.videoDate}>
            {new Date(item.downloadedAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSaveToGallery(item)}
            disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Ionicons name="download" size={24} color="#007AFF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (downloads.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="library-outline" size={64} color="#C7C7CC" />
        <Text style={styles.emptyText}>No downloads yet</Text>
        <Text style={styles.emptySubtext}>
          Download videos from the Download tab
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={downloads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E5EA',
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  videoPlatform: {
    fontSize: 14,
    color: '#8E8E93',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 12,
    gap: 12,
  },
  actionButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

