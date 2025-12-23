import { downloadVideo } from '@/src/services/api';
import { useDownloadStore } from '@/src/store/downloadStore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DownloadScreen() {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const addDownload = useDownloadStore((state) => state.addDownload);

  const validateUrl = (urlString: string): boolean => {
    try {
      const urlObj = new URL(urlString);
      const hostname = urlObj.hostname.toLowerCase();
      
      // Check for supported platforms
      return (
        hostname.includes('instagram.com') ||
        hostname.includes('youtube.com') ||
        hostname.includes('youtu.be') ||
        hostname.includes('tiktok.com') ||
        hostname.includes('facebook.com') ||
        hostname.includes('fb.com')
      );
    } catch {
      return false;
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    if (!validateUrl(url)) {
      Alert.alert(
        'Invalid URL',
        'Please enter a valid URL from Instagram, YouTube, TikTok, or Facebook'
      );
      return;
    }

    setIsDownloading(true);
    try {
      const result = await downloadVideo(url);
      
      if (result.success && result.videoUrl) {
        addDownload({
          id: Date.now().toString(),
          url,
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
          title: result.title || 'Downloaded Video',
          platform: result.platform || 'unknown',
          downloadedAt: new Date().toISOString(),
        });
        
        Alert.alert('Success', 'Video downloaded successfully!');
        setUrl('');
      } else {
        Alert.alert('Error', result.error || 'Failed to download video');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the video');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.label}>Enter Video URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://instagram.com/reel/..."
            placeholderTextColor="#8E8E93"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            editable={!isDownloading}
          />
          
          <Text style={styles.hint}>
            copy & paste see the magic 
          </Text>

          <TouchableOpacity
            style={[styles.button, isDownloading && styles.buttonDisabled]}
            onPress={handleDownload}
            disabled={isDownloading}>
            {isDownloading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="#fff" />
                <Text style={styles.buttonText}>Downloading...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Download Video</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  hint: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

