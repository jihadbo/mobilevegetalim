import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Recette = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recette, setRecette] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [notes, setNotes] = useState(0);
  const navigation = useNavigation();

  function setupData() {
    let allReviews = [];
    setIngredients([]);
    setPreparation([]);
    setCommentaires([]);
    setNotes(0);
    if (recette) {
      recette.ingredients.split(';').map((value) => {
        setIngredients((oldArray) => [...oldArray, value]);
      });
      recette.preparation.split('/').map((value) => {
        setPreparation((oldArray) => [
          ...oldArray,
          { preparation: value, ref: React.createRef() },
        ]);
      });
      allReviews = recette.commentaires.split(';');
      commentaires.map((value) => {
        let review = value.split('/');
        allReviews.push({ name: review[0], note: review[1], com: review[2] });
        setNotes(review[1]);
      });
      setNotes(notes / allReviews.length);
    }
  }

  async function getRecette(id) {
    setIsLoading(true);
    await axios
      .post(
        'http://20.8.119.103:8080/FiltreRecette/',
        { filtre: 'id', valfiltre: id },
        {
          header: {
            'Content-Type':
              'application/x-www-form-urlencoded; charset=UTF-8;application/json',
          },
        }
      )
      .then((res) => {
        if (res.data.recettes) {
          setRecette(res.data.recettes[0]);
        }
      })
      .catch((error) => {});
    setIsLoading(false);
  }

  useEffect(() => {
    getRecette(props.route.params);
  }, []);

  useEffect(() => {
    if (Object.keys(recette).length) {
      setupData();
    }
  }, [recette]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.center}>
          <Text style={styles.recipesName}>
            {recette.name}
            {'\n'}
          </Text>
          <Image
            style={{ width: '60%', height: 200, marginBottom: 20 }}
            source={{ uri: recette.image }}
          />
          <TouchableOpacity
            style={{
              width: '60%',
              backgroundColor: '#BDE9A8',
              padding: 15,
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('StepByStep', {
                preparation: preparation,
                recipeName: recette.name,
                id: props.route.params.id,
              })
            }
          >
            <Text
              style={{
                color: 'black',
                fontSize: 15,
              }}
            >
              Commencer la recette
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.yProfile}>Ingredients : </Text>
        {ingredients.map((value, index) => (
          <Text style={styles.ingredients} key={index}>
            - {value}
          </Text>
        ))}
        <Text style={styles.yProfile}>Steps : </Text>
        {preparation.map((value, index) => (
          <Text style={styles.ingredients} key={index}>
            {index + 1} - {value.preparation}
          </Text>
        ))}
        <View style={styles.yProfileComment}>
          <Text style={styles.yProfile}>Comments</Text>
          {commentaires.map((item, index) => (
            <View
              style={{
                border: 'solid',
                borderWidth: 2,
                borderRadius: 21,
                borderColor: 'black',
                padding: '3%',
                marginBottom: '3%',
              }}
              key={index}
            >
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text> {item.name} </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                  }}
                ></View>
              </View>
              <Text>
                {' '}
                {item.com}
                {'\n'}{' '}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  recipesName: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D2D51',
    fontWeight: 'bold',
  },
  ingredients: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D2D51',
    marginBottom: 10,
  },
  container: {
    paddingTop: getStatusBarHeight(),
  },
  center: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    padding: 20,
  },
  listContainerStyle: {
    marginTop: 0,
  },
  listItemContainerStyle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#cbd2d9',
  },
  titleStyle: {
    backgroundColor: 'red',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 75,
    flex: 0.1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
  },
  body: {
    flex: 0.9,
  },
  li: {
    width: 330,
    backgroundColor: '#fcfcfc',
  },
  text: {
    marginTop: 37,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#252527',
  },
  text1: {
    fontSize: 22,
    marginTop: 37,
    color: '#252527',
  },
  yM: {
    alignItems: 'flex-start',
    flex: 1,
    marginTop: 30,
    marginLeft: 40,
  },
  yProfile: {
    fontSize: 20,
    color: '#1D2D51',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  yProfileComment: {
    fontSize: 20,
    color: '#1D2D51',
    fontWeight: 'bold',
    marginBottom: 20,
    paddingBottom: 30,
  },
  mDetail: {
    fontSize: 17,
    color: '#9ba9cc',
  },
  input: {
    height: 40,
    width: 250,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#918c8c',
  },
  input2: {
    height: 40,
    width: 250,
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#918c8c',
  },
  input3: {
    height: 40,
    width: 250,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#918c8c',
  },
  logs: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    color: '#3287b8',
    marginBottom: 15,
  },
  topA: {
    alignItems: 'center',
    marginTop: 15,
  },
  top: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#f8f8f8',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  logo: {
    width: '85%',
    marginTop: 25,
    height: 200,
    borderWidth: 0,
    borderColor: '#555',
  },
  signC: {
    color: '#326ed5',
  },
  textT: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#252527',
  },
  textI: {
    fontSize: 18,
    marginTop: 15,
    color: '#252527',
    marginBottom: 15,
  },
  button: {
    width: 250,
    height: 30,
    backgroundColor: '#326ed5',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonSS: {
    width: 145,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: 'rgb(184, 31, 31)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: 100,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#D32D35',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonconfirm: {
    width: 140,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 19,

    borderColor: '#368BE7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  datePickerStyle: {
    width: 230,
  },
});

export default Recette;
