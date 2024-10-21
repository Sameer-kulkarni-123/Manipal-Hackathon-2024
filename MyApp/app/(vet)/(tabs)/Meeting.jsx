import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Divider } from 'react-native-paper';
import 'react-native-vector-icons/MaterialCommunityIcons';

// Define the Meeting type
type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
};

// Sample meetings data
const meetings: Meeting[] = [
  { id: '1', title: 'Consultation with John Doe', date: '2024-10-18', time: '9:00 AM' },
  { id: '2', title: 'Follow-up with Jane Smith', date: '2024-10-18', time: '11:00 AM' },
  { id: '3', title: 'Therapy Session with Alice Johnson', date: '2024-10-18', time: '2:00 PM' },
  { id: '4', title: 'Annual Checkup with Bob Brown', date: '2024-10-19', time: '10:00 AM' },
  { id: '5', title: 'Consultation with Charlie Green', date: '2024-10-19', time: '1:30 PM' },
  { id: '6', title: 'Therapy Session with David Wilson', date: '2024-10-19', time: '3:30 PM' },
  { id: '7', title: 'Follow-up with Emma Davis', date: '2024-10-20', time: '9:00 AM' },
  { id: '8', title: 'Consultation with Frank Harris', date: '2024-10-20', time: '12:00 PM' },
  { id: '9', title: 'Checkup with Grace White', date: '2024-10-20', time: '4:00 PM' },
  { id: '10', title: 'Consultation with Henry Lewis', date: '2024-10-21', time: '8:30 AM' },
  { id: '11', title: 'Therapy Session with Ivy Walker', date: '2024-10-21', time: '11:30 AM' },
  { id: '12', title: 'Follow-up with Jack Scott', date: '2024-10-21', time: '2:30 PM' },
  { id: '13', title: 'Consultation with Katie Young', date: '2024-10-22', time: '10:00 AM' },
  { id: '14', title: 'Checkup with Liam King', date: '2024-10-22', time: '1:00 PM' },
  { id: '15', title: 'Therapy Session with Mia Hall', date: '2024-10-22', time: '3:00 PM' },
  { id: '16', title: 'Follow-up with Noah Clark', date: '2024-10-23', time: '9:30 AM' },
  { id: '17', title: 'Consultation with Olivia Rodriguez', date: '2024-10-23', time: '12:30 PM' },
  { id: '18', title: 'Checkup with Peter Martinez', date: '2024-10-23', time: '4:30 PM' },
  { id: '19', title: 'Consultation with Quinn Lee', date: '2024-10-24', time: '10:30 AM' },
  { id: '20', title: 'Therapy Session with Rachel Perez', date: '2024-10-24', time: '2:00 PM' },
];

const MeetingSchedule: React.FC = () => {
  const router = useRouter();

  // Render each meeting item
  const renderItem = ({ item }: { item: Meeting }) => (
    <Card style={{ marginVertical: 8, padding: 16 }} onPress={() => router.push(`/meeting/${item.id}`)}>
      <Text className="text-lg font-bold">{item.title}</Text>
      <Divider style={{ marginVertical: 8 }} />
      <Text className="text-gray-600">Date: {item.date}</Text>
      <Text className="text-gray-600">Time: {item.time}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#f8f9fa' }}>
      <Text className="text-2xl font-bold text-center my-4">Meeting Schedule</Text>
      <FlatList
        data={meetings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default MeetingSchedule;
