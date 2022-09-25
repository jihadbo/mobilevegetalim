import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RecipeDuration, RecipeTitle } from './RecipeInfo'

const RecipeCard = ({ data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={{
      backgroundColor: "#FFF",
      borderRadius: 10,
      margin : 20,
      shadowColor: "#001F2D",
      elevation: 15,
    }}
    onPress={() => navigation.navigate('Recettes', data.id)}
    >
      <View style={{
        width: "100%",
        height: 200
      }}>
        <Image
          source={{uri : data.image}}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 15
      }}>
        <RecipeTitle title={data.name} titleSize={20} />
        <RecipeDuration duration={data.temps} />
      </View>
    </TouchableOpacity>
  )
}

export default RecipeCard