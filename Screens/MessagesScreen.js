import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesScreen = ({ navigation }) => {
  const messages = [
    { id: '1', sender: 'Carl', content: 'hiring amoang company apply ka?' },
    { id: '2', sender: 'Raiv', content: 'ngapply ta trabaho san.' },
    { id: '3', sender: 'Gleth', content: 'daghan kaayo hiring nga company san' },
    { id: '4', sender: 'Arlene', content: 'oh lhuisan bakit di kapa nakahanap ng trabaho?' },
    { id: '5', sender: 'Baldelovar', content: 'may hiring ngayon ah? mag hanap ka ng trabaho' },
  ];

  const handleReply = (sender) => {
    Alert.alert('Reply', `You are replying to ${sender}`);
  };

  const handleNewMessage = (sender) => {
    Alert.alert('New Message', `You are messaging ${sender}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#8B00FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageItem} onPress={() => {}}>
            <Ionicons name="person-circle-outline" size={40} color="#8B00FF" />
            <View style={styles.messageContent}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleReply(item.sender)}>
                <Text style={styles.actionText}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleNewMessage(item.sender)}>
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#8B00FF' },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContent: { marginLeft: 15, flex: 1 },
  sender: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  content: { fontSize: 14, color: '#555' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: '#8B00FF',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MessagesScreen;
