import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import 'nativewind';

// Importing images
const petImages = {
  dog1: require('../../../assets/images/Gretriever.jpg'),
  dog2: require('../../../assets/images/labrador.jpg'),
  dog3: require('../../../assets/images/beagle.jpg'),
  cat1: require('../../../assets/images/cat.jpg'),
  cat2: require('../../../assets/images/cat1.jpg'),
  bird1: require('../../../assets/images/bird1.jpg'),
  bird2: require('../../../assets/images/bird2.jpg'),
  hamster1: require('../../../assets/images/hamster.jpg'),
};

// Sample data for adoption
const petsForAdoption = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    imageUrl: petImages.dog1,
    available: true,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'Labrador',
    imageUrl: petImages.dog2,
    available: false,
  },
  {
    id: '3',
    name: 'Bella',
    breed: 'Beagle',
    imageUrl: petImages.dog3,
    available: true,
  },
  {
    id: '4',
    name: 'Whiskers',
    breed: 'Siamese Cat',
    imageUrl: petImages.cat1,
    available: true,
  },
  {
    id: '5',
    name: 'Mittens',
    breed: 'Persian Cat',
    imageUrl: petImages.cat2,
    available: false,
  },
];

// Shop details
const shopAddress = "123 Pet Street, Happy Town, HT 56789";
const shopTimings = {
  Monday: "9:00 AM - 6:00 PM",
  Tuesday: "9:00 AM - 6:00 PM",
  Wednesday: "9:00 AM - 6:00 PM",
  Thursday: "9:00 AM - 6:00 PM",
  Friday: "9:00 AM - 6:00 PM",
  Saturday: "10:00 AM - 4:00 PM",
  Sunday: "Closed",
};

// Sample pet care links
const petCareLinks = {
  general: [
    {
      id: '1',
      title: 'ASPCAs Pet Care Section',
      url: 'https://www.aspca.org/pet-care',
    },
    {
      id: '2',
      title: 'PetPlace',
      url: 'https://www.petplace.com/',
    },
    {
      id: '3',
      title: 'American Veterinary Medical Association',
      url: 'https://www.avma.org/',
    },
  ],
  cats: [
    {
      id: '4',
      title: 'ASPCA Cat Care',
      url: 'https://www.aspca.org/search/node?search=cat',
    },
  ],
  dogs: [
    {
      id: '5',
      title: 'WebMD Dog Care',
      url: 'https://www.aspca.org/search/node?search=dog',
    },
  ],
  hamsters: [
    {
      id: '6',
      title: 'AVMA Hamster Care',
      url: 'https://www.avma.org/search?search=hamster',
    },
  ],
  birds: [
    {
      id: '7',
      title: 'PetPlace Bird Care',
      url: 'https://www.petplace.com/search?query=birds',
    },
  ],
};

const RescueAndAdoptionPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showGeneral, setShowGeneral] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [showDogs, setShowDogs] = useState(false);
  const [showHamsters, setShowHamsters] = useState(false);
  const [showBirds, setShowBirds] = useState(false);

  // Render each pet item in the FlatList
  const renderPetItem = ({ item }) => (
    <View className="w-56 bg-white rounded-lg shadow-md mr-4 p-4 items-center">
      <Image source={item.imageUrl} className="w-40 h-40 rounded-lg mb-2" />
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-sm text-gray-500 mb-2">{item.breed}</Text>

      {/* Button 1: Adopt Me */}
      <TouchableOpacity
        className="bg-purple-300 rounded-md py-2 px-4 mt-2"
        onPress={() => {
          setSelectedPet(item);
          setModalVisible(true);
        }}
      >
        <Text className="text-white text-base">Adopt Me</Text>
      </TouchableOpacity>
    </View>
  );

  // Render shop timings
  const renderShopTimings = () => {
    return Object.keys(shopTimings).map((day) => (
      <Text key={day} className="text-gray-700 text-sm">
        {day}: {shopTimings[day]}
      </Text>
    ));
  };

  // Render pet care links based on category
  const renderPetCareLink = (links) =>
    links.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => Linking.openURL(item.url)}
        className="mb-4 p-4 bg-purple-200 rounded-md"
      >
        <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
      </TouchableOpacity>
    ));

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100 pt-10">
      <Text className="text-3xl font-bold text-center mb-4">Pets Up for Adoption</Text>
      <FlatList
        data={petsForAdoption}
        keyExtractor={(item) => item.id}
        renderItem={renderPetItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-8"
      />

      {/* Modal for Pet Details */}
      {selectedPet && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-6 rounded-lg shadow-lg">
              <Text className="text-2xl font-bold mb-2">{selectedPet.name}</Text>
              <Text className="text-lg mb-2">Breed: {selectedPet.breed}</Text>
              <Text className="text-lg mb-2">Address: {shopAddress}</Text>
              <Text className="text-lg mb-2">
                Availability: {selectedPet.available ? "Available" : "Not Available"}
              </Text>
              <Text className="text-lg font-bold mb-2">Shop Timings:</Text>
              {renderShopTimings()}

              {/* Close button */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-purple-300 rounded-md py-2 px-4 mt-4"
              >
                <Text className="text-white text-base">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Pet Care Information Section */}
      <Text className="text-2xl font-bold text-center mb-3">Pet Care Information</Text>

      <View className="bg-white p-4 rounded-lg shadow-md mb-8">
        {/* General Pet Care Info */}
        <TouchableOpacity onPress={() => setShowGeneral(!showGeneral)}>
          <Text className="text-xl font-bold mb-2">General Pet Care Info</Text>
        </TouchableOpacity>
        {showGeneral && renderPetCareLink(petCareLinks.general)}

        {/* Cats */}
        <TouchableOpacity onPress={() => setShowCats(!showCats)}>
          <Text className="text-xl font-bold mb-2">Cats</Text>
        </TouchableOpacity>
        {showCats && renderPetCareLink(petCareLinks.cats)}

        {/* Dogs */}
        <TouchableOpacity onPress={() => setShowDogs(!showDogs)}>
          <Text className="text-xl font-bold mb-2">Dogs</Text>
        </TouchableOpacity>
        {showDogs && renderPetCareLink(petCareLinks.dogs)}

        {/* Hamsters */}
        <TouchableOpacity onPress={() => setShowHamsters(!showHamsters)}>
          <Text className="text-xl font-bold mb-2">Hamsters</Text>
        </TouchableOpacity>
        {showHamsters && renderPetCareLink(petCareLinks.hamsters)}

        {/* Birds */}
        <TouchableOpacity onPress={() => setShowBirds(!showBirds)}>
          <Text className="text-xl font-bold mb-2">Birds</Text>
        </TouchableOpacity>
        {showBirds && renderPetCareLink(petCareLinks.birds)}
      </View>
    </ScrollView>
  );
};

export default RescueAndAdoptionPage;
