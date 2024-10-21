import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommunityForum = () => {
  const [questions, setQuestions] = useState([
    {
      id: '1',
      text: "How can I improve my coding skills in React Native?",
      replies: [
        { id: '1-1', text: "Practice is key. Try building small projects, like a to-do app or a weather app. It helps you get familiar with the components and libraries in React Native.", thumbsUp: 4, thumbsDown: 1 },
        { id: '1-2', text: "Follow online tutorials and courses. Websites like Udemy and freeCodeCamp have some great resources that can help you learn step by step.", thumbsUp: 6, thumbsDown: 2 },
        { id: '1-3', text: "Don't just learn the basics. Deep dive into advanced topics like state management, navigation, and performance optimization. They make a big difference in your skills.", thumbsUp: 3, thumbsDown: 0 }
      ],
    },
    {
      id: '2',
      text: "What are some good strategies for managing state in a large React Native app?",
      replies: [
        { id: '2-1', text: "Using Redux is a popular choice for large apps because it provides a single source of truth for the state and makes debugging easier.", thumbsUp: 5, thumbsDown: 1, userAction: null },
        { id: '2-2', text: "Context API works well for smaller apps but might not scale as efficiently as Redux for larger apps. However, combining it with libraries like Recoil or Jotai can help.", thumbsUp: 3, thumbsDown: 2, userAction: null },
        { id: '2-3', text: "Avoid prop drilling by using state management libraries and adopting a modular approach to organize your components and logic.", thumbsUp: 4, thumbsDown: 1, userAction: null }
      ],
    },
    {
      id: '3',
      text: "What’s the best way to handle navigation in React Native?",
      replies: [
        { id: '3-1', text: "React Navigation is the most widely used library and offers a lot of features like stack, tab, and drawer navigations, making it versatile for different types of apps.", thumbsUp: 7, thumbsDown: 0 },
        { id: '3-2', text: "If you need a lightweight solution, try React Native Router Flux. It’s simpler than React Navigation and easy to set up for smaller projects.", thumbsUp: 2, thumbsDown: 3 },
        { id: '3-3', text: "You can also use built-in Navigation API, but for complex routing, React Navigation is more powerful and customizable.", thumbsUp: 3, thumbsDown: 1 }
      ],
    },
    {
      id: '4',
      text: "How do I optimize a React Native app for better performance?",
      replies: [
        { id: '4-1', text: "Use FlatList instead of ScrollView for rendering large lists of data. It’s optimized for better memory and performance handling.", thumbsUp: 8, thumbsDown: 1 },
        { id: '4-2', text: "Minimize the number of re-renders by using `React.memo` and `useCallback` hooks. This will prevent unnecessary rendering of components.", thumbsUp: 5, thumbsDown: 0 },
        { id: '4-3', text: "Avoid large image files and use image caching techniques. It can significantly reduce load time and improve app responsiveness.", thumbsUp: 6, thumbsDown: 2 }
      ],
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Function to add a new question
  const addQuestion = () => {
    if (newQuestion.trim() === '') {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    const question = {
      id: Math.random().toString(), // Generate a unique ID
      text: newQuestion,
      replies: [],
    };

    setQuestions([...questions, question]);
    setNewQuestion('');
  };

  // Function to add a reply to a question
  const addReply = (questionId) => {
    if (reply.trim() === '') {
      Alert.alert('Error', 'Please enter a reply');
      return;
    }

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: [...q.replies, { id: Math.random().toString(), text: reply, thumbsUp: 0, thumbsDown: 0, userAction: null }],
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setReply('');
    setSelectedQuestion(null);
  };

  // Function to handle thumbs up
  const handleThumbsUp = (questionId, replyId) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: q.replies.map((r) => {
            if (r.id === replyId) {
              if (r.userAction === 'thumbsUp') return r;
              const thumbsDownAdjustment = r.userAction === 'thumbsDown' ? -1 : 0;
              return {
                ...r,
                thumbsUp: r.thumbsUp + 1,
                thumbsDown: r.thumbsDown + thumbsDownAdjustment,
                userAction: 'thumbsUp',
              };
            }
            return r;
          }),
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
  };

  // Function to handle thumbs down
  const handleThumbsDown = (questionId, replyId) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: q.replies.map((r) => {
            if (r.id === replyId) {
              if (r.userAction === 'thumbsDown') return r;
              const thumbsUpAdjustment = r.userAction === 'thumbsUp' ? -1 : 0;
              return {
                ...r,
                thumbsDown: r.thumbsDown + 1,
                thumbsUp: r.thumbsUp + thumbsUpAdjustment,
                userAction: 'thumbsDown',
              };
            }
            return r;
          }),
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {questions.map((item) => (
          <View key={item.id} className="bg-white p-4 mb-4 rounded border border-gray-300">
            <Text className="font-bold text-lg">{item.text}</Text>

            <TouchableOpacity className="mt-2" onPress={() => setSelectedQuestion(item.id)}>
              <Text className="text-purple-600 font-bold">Reply</Text>
            </TouchableOpacity>

            {/* Render replies */}
            <FlatList
              data={item.replies}
              keyExtractor={(reply) => reply.id}
              renderItem={({ item: reply }) => (
                <View className="mt-2">
                  <Text className="text-gray-700">- {reply.text}</Text>

                  {/* Thumbs Up and Thumbs Down */}
                  <View className="flex-row mt-2">
                    <TouchableOpacity className="mr-4" onPress={() => handleThumbsUp(item.id, reply.id)}>
                      <Text>👍 {reply.thumbsUp}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleThumbsDown(item.id, reply.id)}>
                      <Text>👎 {reply.thumbsDown}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            {/* Reply input for the selected question */}
            {selectedQuestion === item.id && (
              <View className="mt-2">
                <TextInput
                  className="border border-gray-300 p-2 rounded bg-white"
                  placeholder="Write a reply..."
                  value={reply}
                  onChangeText={setReply}
                />
                <TouchableOpacity className="bg-purple-600 mt-2 p-2 rounded" onPress={() => addReply(item.id)}>
                  <Text className="text-white text-center font-bold">Post Reply</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {/* Moved "Ask a question" section down here */}
        <View className="mb-4">
          <TextInput
            className="border border-gray-300 p-2 rounded bg-white"
            placeholder="Ask a question..."
            value={newQuestion}
            onChangeText={setNewQuestion}
          />
          <TouchableOpacity className="bg-purple-600 mt-2 p-2 rounded" onPress={addQuestion}>
            <Text className="text-white text-center font-bold">Post Question</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityForum;
