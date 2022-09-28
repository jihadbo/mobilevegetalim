import { View, Text, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccordionList from './AccordionList';

var durationFilter = {
  title: 'Duration',
  parameters: [
    { content: 'Au moins 5 minutes', value: 5, selected: false },
    { content: 'Au moins 15 minutes', value: 15, selected: false },
    { content: 'Au moins 30 minutes', value: 30, selected: false },
  ],
  lockSelection: false,
  selectedFilterIndex: -1,
};

var ingredientFilter = {
  title: 'Ingédients',
  parameters: [
    { content: 'Brocoli', value: 'brocoli', selected: false },
    { content: 'Oeuf', value: 'oeufs', selected: false },
    { content: 'Saumon', value: 'saumon', selected: false },
    { content: 'Tomate', value: 'tomate', selected: false },
    { content: 'Riz', value: 'riz', selected: false },
  ],
  lockSelection: false,
  selectedFilterIndex: -1,
};

const FilterModal = ({
  openModal,
  setOpenModal,
  setFilterRecipe,
  filterRecipe,
}) => {
  return (
    <Modal visible={openModal} animationType="slide">
      <View
        style={{
          width: '100%',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            padding: 20,
          }}
        >
          <AccordionList
            filterData={durationFilter}
            filterRecipe={filterRecipe}
            setFilterRecipe={setFilterRecipe}
            filterName="temps"
          />
          <AccordionList
            filterData={ingredientFilter}
            filterRecipe={filterRecipe}
            setFilterRecipe={setFilterRecipe}
            filterName="ingredients"
          />
          <TouchableOpacity onPress={() => setOpenModal(false)}>
            <MaterialCommunityIcons
              name="keyboard-return"
              style={{
                fontSize: 50,
                width: '15%',
                borderWidth: 1,
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
