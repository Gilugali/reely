import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDownloadStore } from '@/src/store/downloadStore';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const clearAllDownloads = useDownloadStore((state) => state.clearAllDownloads);
  const downloadsCount = useDownloadStore((state) => state.downloads.length);

  const handleClearAll = () => {
    if (downloadsCount === 0) {
      Alert.alert('Info', 'No downloads to clear');
      return;
    }

    Alert.alert(
      'Clear All Downloads',
      `Are you sure you want to delete all ${downloadsCount} downloaded videos?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearAllDownloads();
            Alert.alert('Success', 'All downloads cleared');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Total Downloads</Text>
            <Text style={styles.settingValue}>{downloadsCount} videos</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleClearAll}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Clear All Downloads</Text>
            <Text style={styles.settingDescription}>
              Remove all downloaded videos from the app
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#8E8E93',
  },
  settingDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
});

