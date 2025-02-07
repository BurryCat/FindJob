import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FindJobScreen = ({ navigation }) => {
  const jobs = [
    { title: "Software Engineer", description: "Develop and maintain web and mobile applications.", requirements: "Proficiency in JavaScript, React, and Node.js. 2+ years of experience." },
    { title: "Graphic Designer", description: "Create visual concepts and UI/UX designs for digital platforms.", requirements: "Experience with Adobe Suite and Figma. Strong creativity skills." },
    { title: "Marketing Specialist", description: "Develop and execute marketing campaigns for brand awareness.", requirements: "Knowledge of SEO, social media, and content marketing." },
    { title: "Data Analyst", description: "Analyze data trends and generate reports for business insights.", requirements: "Experience with Python, SQL, and data visualization tools." },
    { title: "Customer Support Representative", description: "Assist customers via email, chat, and phone calls.", requirements: "Excellent communication and problem-solving skills." },
    { title: "Project Manager", description: "Manage projects, ensure deadlines are met, and coordinate teams.", requirements: "Experience with Agile methodologies and leadership skills." },
    { title: "Content Writer", description: "Write articles, blog posts, and marketing copy.", requirements: "Strong writing skills and knowledge of SEO best practices." },
    { title: "HR Specialist", description: "Recruit and manage company personnel, handle HR policies.", requirements: "Background in HR and excellent interpersonal skills." },
    { title: "IT Support Specialist", description: "Provide technical support and troubleshooting for users.", requirements: "Experience with networking, hardware, and software troubleshooting." },
    { title: "Finance Analyst", description: "Analyze financial data and provide reports for decision-making.", requirements: "Strong analytical skills and experience with financial modeling." },
    { title: "Sales Representative", description: "Sell products and services while managing client relationships.", requirements: "Excellent communication and negotiation skills." },
    { title: "Full-Stack Developer", description: "Develop both frontend and backend applications.", requirements: "Experience with JavaScript, React, Node.js, and databases." },
    { title: "Cybersecurity Analyst", description: "Monitor security threats and implement cybersecurity measures.", requirements: "Knowledge of network security, firewalls, and encryption." },
    { title: "Social Media Manager", description: "Manage social media accounts and create engaging content.", requirements: "Experience with social media marketing and analytics tools." },
    { title: "Mobile App Developer", description: "Develop applications for Android and iOS platforms.", requirements: "Experience with React Native, Swift, or Kotlin." },
    { title: "Legal Advisor", description: "Provide legal guidance and ensure compliance with regulations.", requirements: "Law degree and experience in corporate law." },
    { title: "Mechanical Engineer", description: "Design and analyze mechanical systems and components.", requirements: "Degree in Mechanical Engineering and CAD experience." },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#8B00FF" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerTitle}>Find a Job</Text>

      {/* Job Listings */}
      <ScrollView>
        {jobs.map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobDescription}>{job.description}</Text>
            <Text style={styles.jobRequirements}>Requirements: {job.requirements}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#8B00FF', textAlign: 'center', marginBottom: 20 },
  jobCard: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B00FF',
    marginBottom: 15,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B00FF', marginBottom: 5 },
  jobDescription: { fontSize: 14, color: '#333', marginBottom: 5 },
  jobRequirements: { fontSize: 14, fontStyle: 'italic', color: '#666' },
});

export default FindJobScreen;
