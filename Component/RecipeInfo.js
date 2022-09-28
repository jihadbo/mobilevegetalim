import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const RecipeTitle = ({ title, titleSize }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        name="fruit-cherries"
        style={{ fontSize: 20, color: '#103e5c', marginRight: 2 }}
      />
      <Text
        style={{
          fontSize: titleSize,
          height: 'auto',
          width: '80%',
        }}
      >
        | {title}
      </Text>
    </View>
  );
};

export const RecipeDuration = ({ duration }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        name="timer"
        style={{ fontSize: 20, color: '#103e5c', marginRight: 2 }}
      />
      <Text style={{ fontSize: 15 }}>{duration} min</Text>
    </View>
  );
};

export const RecipeNotes = () => {
  return (
    <View>
      <Text>RecipeInfo</Text>
    </View>
  );
};
