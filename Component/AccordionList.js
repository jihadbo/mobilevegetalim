import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterParameter = ({
  params,
  index,
  setFilterRecipe,
  filterName,
  filterData,
}) => {
  function handleOnPress() {
    if (!filterData.lockSelection && !params.selected) {
      params.selected = true;
      setFilterRecipe({ filter: filterName, valfiltre: params.value });
      filterData.lockSelection = true;
      filterData.selectedFilterIndex = index;
    } else if (filterData.lockSelection && params.selected) {
      params.selected = false;
      setFilterRecipe({ filter: null, valfiltre: null });
      filterData.lockSelection = false;
      filterData.selectedFilterIndex = -1;
    } else if (filterData.lockSelection && !params.selected) {
      params.selected = true;
      setFilterRecipe({ filter: filterName, valfiltre: params.value });
      filterData.parameters[filterData.selectedFilterIndex].selected = false;
      filterData.selectedFilterIndex = index;
    }
  }

  return (
    <TouchableOpacity key={index} onPress={() => handleOnPress()}>
      <Text
        style={{
          backgroundColor: params.selected ? '#103e5c' : 'white',
          color: params.selected ? 'white' : '#103e5c',
          fontSize: 18,
          marginRight: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderRadius: 15,
          padding: 10,
        }}
      >
        {params.content}
      </Text>
    </TouchableOpacity>
  );
};

const AccordionList = ({
  filterData,
  setFilterRecipe,
  filterRecipe,
  filterName,
}) => {
  const [showContent, setShowContent] = useState(
    filterRecipe.filter ? true : false
  );

  return (
    <TouchableOpacity
      style={styles.accordionContainer}
      onPress={() => setShowContent(true)}
      disabled={showContent}
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="timer-sand" size={30} color="#103e5c" />
          <Text style={styles.title}>{filterData.title}</Text>
        </View>

        {showContent ? (
          <TouchableOpacity onPress={() => setShowContent(false)}>
            <AntDesign name="upcircle" style={styles.arrowIcon} />
          </TouchableOpacity>
        ) : (
          <AntDesign name="downcircle" style={styles.arrowIcon} />
        )}
      </View>
      {showContent && (
        <View style={styles.filterParamsContainer}>
          {filterData.parameters.map((params, key) => (
            <FilterParameter
              key={key}
              params={params}
              index={key}
              setFilterRecipe={setFilterRecipe}
              filterName={filterName}
              filterData={filterData}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  arrowIcon: {
    marginLeft: 20,
    fontSize: 20,
    color: '#103e5c',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
  },
  filterParamsContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});

export default AccordionList;
