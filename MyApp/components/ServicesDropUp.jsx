import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ServicesDropUp = ({ visible, onClose }) => {
  const router = useRouter();

  const navigateToService = (service) => {
    onClose(); 
    router.push(`/user/tab/${service}`); 
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dropUpContainer}>
          <Text style={styles.dropUpTitle}>Services</Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('../../(drop-down)/PetWalker')}>
            <Text style={styles.optionText}>Pet Walker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('../../(drop-down)/PetDayCare')}>
            <Text style={styles.optionText}>Pet Daycare</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('../../(drop-down)/VetLocation')}>
            <Text style={styles.optionText}>Vet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('../../(drop-down)/PetGroomer')}>
            <Text style={styles.optionText}>Pet Groomer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dropUpContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  dropUpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFA001',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ServicesDropUp;
