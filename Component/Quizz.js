import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

var questionData = [
  {
    question:
      'Les olives vertes sont-elles bénéfique pour le bon cholestérol ?',
    options: ['Oui', 'Non'],
    answer: 'Oui',
  },
  {
    question: 'Avec quoi ne fait-on pas du sucre ?',
    options: [
      'Avec la canne à sucre',
      'Avec la betterave sucrière',
      'Avec la fève de cacao',
    ],
    answer: 'Avec la fève de cacao',
  },
  {
    question: "Les frites dans l'huile contiennent moins 10% de graisses ?",
    options: ['Vrai', 'Faux'],
    answer: 'Faux',
  },
  {
    question: 'Quel pain facilite le plus la digestion ?',
    options: ['Le pain blanc', 'Le pistolet', 'Le pain de seigle'],
    answer: 'Le pain de seigle',
  },
];

const Quizz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setisOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const navigation = useNavigation();

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, questionData.length],
    outputRange: ['0%', '100%'],
  });

  const validateAnswer = (selectedOption) => {
    let answer = questionData[currentQuestionIndex]['answer'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(answer);
    setisOptionDisabled(true);

    if (selectedOption == answer) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == questionData.length - 1) {
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setisOptionDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setisOptionDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}/
          </Text>
          <Text>{questionData.length}</Text>
        </View>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          {questionData[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: 'black',
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#BDE9A8',
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {questionData[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? '#007dff'
                  : option == currentOptionSelected
                  ? 'red'
                  : 'black',
              backgroundColor:
                option == correctOption
                  ? '#007dff'
                  : option == currentOptionSelected
                  ? 'red'
                  : 'black',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}
            >
              {option}
            </Text>
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: '#007dff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  style={{
                    fontSize: 20,
                    color: 'white',
                  }}
                  name="check"
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  style={{
                    fontSize: 20,
                    color: 'white',
                  }}
                  name="close"
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: '#BDE9A8',
            padding: 20,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              textAlign: 'center',
            }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          position: 'relative',
        }}
      >
        {renderProgressBar()}
        {renderQuestion()}
        {renderOptions()}
        {renderNextButton()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                }}
              >
                {score > questionData.length / 2 ? 'Bravo !' : 'Mince !'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: score > questionData.length / 2 ? 'black' : 'red',
                  }}
                >
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}
                >
                  {' '}
                  / {questionData.length}
                </Text>
              </View>
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: '#cae8ff',
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}
                >
                  Retentez le quizz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  backgroundColor: '#BDE9A8',
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                  marginVertical: 25,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}
                >
                  Revenir à la recette
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Quizz;
