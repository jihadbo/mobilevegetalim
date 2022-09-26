import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FilterModal from './FilterModal';

const RecipeHeader = ({ onSearch, setFilterRecipe, filterRecipe }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      style={{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FilterModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setFilterRecipe={setFilterRecipe}
        filterRecipe={filterRecipe}
      />
      <View
        style={{
          backgroundColor: '#c3c9cd',
          width: '90%',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <AntDesign
          name="search1"
          style={{ fontSize: 20, marginRight: 10, marginLeft: 10 }}
        />
        <TextInput
          placeholder="Search recipe or ingredients ..."
          onChangeText={onSearch}
          style={{ flex: 1, fontSize: 16 }}
        />
      </View>
      <View
        style={{
          marginLeft: 7,
        }}
      >
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <AntDesign
            name="filter"
            style={{
              fontSize: 38,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeHeader;
