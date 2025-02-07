import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobScreen = ({ navigation }) => {
  // Example job posts
  const jobPosts = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Innovators',
      description: 'Join our team to build modern web applications using React and Vue.js.',
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Co.',
      description: 'Work on designing beautiful user interfaces and improving user experiences.',
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Backend Builders',
      description: 'Help us build scalable and efficient APIs using Node.js and Express.',
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Startup Hub',
      description: 'Lead the product development process from ideation to execution.',
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Data Insights',
      description: 'Analyze large datasets and build machine learning models to drive business decisions.',
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      company: 'Market Reach',
      description: 'Develop and implement marketing strategies to increase brand awareness and engagement.',
    },
  ];

  const handleApply = (job) => {
    alert(`You applied for ${job.title} at ${job.company}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.jobList}>
        {jobPosts.map((job) => (
          <View key={job.id} style={styles.jobPost}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company}</Text>
            <Text style={styles.jobDescription}>{job.description}</Text>
            <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(job)}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
              <Text style={styles.applyText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  jobList: { marginTop: 20 },
  jobPost: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  jobCompany: { fontSize: 14, color: '#777', marginTop: 5 },
  jobDescription: { fontSize: 14, color: '#555', marginTop: 10 },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B00FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
  },
  applyText: { color: '#fff', fontSize: 16, marginLeft: 10 },
});

export default JobScreen;
