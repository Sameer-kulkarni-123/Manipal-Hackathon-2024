import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native';

// Sample data for patients
const sampleMedicalRecords = [
  {
    medicalNumber: '001',
    name: 'John Doe',
    details: [
      { date: '2024-10-01', notes: 'Routine check-up, no issues reported.' },
      { date: '2024-08-15', notes: 'Blood pressure monitoring, slight hypertension detected.' },
    ],
  },
  {
    medicalNumber: '002',
    name: 'Jane Smith',
    details: [
      { date: '2024-09-10', notes: 'Follow-up on migraine treatment.' },
      { date: '2024-07-30', notes: 'MRI scan results were normal.' },
    ],
  },
  {
    medicalNumber: '003',
    name: 'Michael Johnson',
    details: [
      { date: '2024-08-20', notes: 'Fracture check-up, healing well.' },
      { date: '2024-06-15', notes: 'Initial fracture diagnosis.' },
    ],
  },
  {
    medicalNumber: '004',
    name: 'Emily Davis',
    details: [
      { date: '2024-07-25', notes: 'Annual physical examination.' },
      { date: '2024-05-10', notes: 'Vaccination completed.' },
    ],
  },
  // Add more sample records as needed
];

const MedicalRecordsPage = () => {
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [updateNotes, setUpdateNotes] = useState('');
  const [records, setRecords] = useState(sampleMedicalRecords);

  // Toggle function to expand/collapse the patient's record
  const toggleRecord = (index) => {
    setExpandedRecord(expandedRecord === index ? null : index);
  };

  const handleUpdate = (medicalNumber) => {
    const updatedRecords = records.map(record => {
      if (record.medicalNumber === medicalNumber) {
        return {
          ...record,
          details: [
            ...record.details,
            { date: new Date().toISOString().split('T')[0], notes: updateNotes }
          ]
        };
      }
      return record;
    });
    setRecords(updatedRecords);
    setUpdateNotes('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Medical Record</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.medicalNumber}
        renderItem={({ item, index }) => (
          <View style={styles.recordContainer}>
            <TouchableOpacity onPress={() => toggleRecord(index)}>
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.medicalNumber}>Medical Number: {item.medicalNumber}</Text>
            </TouchableOpacity>
            {expandedRecord === index && (
              <View style={styles.detailsContainer}>
                {item.details.map((detail, idx) => (
                  <View key={idx} style={styles.detailItem}>
                    <Text style={styles.detailText}>Date: {detail.date}</Text>
                    <Text style={styles.detailText}>Notes: {detail.notes}</Text>
                  </View>
                ))}
                <TextInput
                  style={styles.textInput}
                  placeholder="Add a note to this record..."
                  value={updateNotes}
                  onChangeText={(text) => setUpdateNotes(text)}
                />
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdate(item.medicalNumber)}
                >
                  <Text style={styles.updateButtonText}>Update Record</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light shade of purple
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C4D7D', // Darker shade of purple for heading
  },
  recordContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicalNumber: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  updateButton: {
    backgroundColor: '#D8BFD8', // Darker shade of purple for button
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MedicalRecordsPage;