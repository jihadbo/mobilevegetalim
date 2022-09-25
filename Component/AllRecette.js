import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import RecipeHeader from './RecipeHeader';

export default function AllRecette() {
  const [recette, setRecette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noRecipe, setNoRecipe] = useState(null);
  const [filterRecipe, setFilterRecipe] = useState({
    filter: null,
    valfiltre: null,
  });

  async function getAllRecette() {
    setIsLoading(true);
    await axios
      .get('http://20.8.119.103:8080/AllRecette/', {
        header: {
          'Content-Type':
            'application/x-www-form-urlencoded; charset=UTF-8;application/json',
        },
      })
      .then((res) => {
        setRecette(res.data.recettes);
      })
      .catch((error) => {});
    setIsLoading(false);
  }

  const handleSearch = async (value) => {
    setIsLoading(true);
    await axios
      .post(
        'http://20.8.119.103:8080/FiltreRecette/',
        { filtre: 'name', valfiltre: String(value).toLowerCase() },
        {
          header: {
            'Content-Type':
              'application/x-www-form-urlencoded; charset=UTF-8;application/json',
          },
        }
      )
      .then((res) => {
        setRecette(res.data.recettes);
      })
      .catch((error) => {});
    setIsLoading(false);
  };

  useEffect(() => {
    getAllRecette();
  }, []);

  useEffect(async () => {
    if (filterRecipe.filter && filterRecipe.valfiltre) {
      setIsLoading(true);
      await axios
        .post(
          'http://20.8.119.103:8080/FiltreRecette/',
          { filtre: filterRecipe.filter, valfiltre: filterRecipe.valfiltre },
          {
            header: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8;application/json',
            },
          }
        )
        .then((res) => {
          setRecette(res.data.recettes);
        })
        .catch((error) => {});
      setIsLoading(false);
    } else {
      getAllRecette();
    }
  }, [filterRecipe]);

  return (
    <View>
      <FlatList
        data={recette}
        renderItem={({ item }) => <RecipeCard data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <RecipeHeader
            onSearch={handleSearch}
            filterRecipe={filterRecipe}
            setFilterRecipe={setFilterRecipe}
          />
        }
      />
      {setNoRecipe && <Text>{noRecipe}</Text>}
    </View>
  );
}
