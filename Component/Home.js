import React, { Component, useState, useEffect }  from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

export default function Home({navigation}) {
  const data = [{img : "https://www.pngall.com/wp-content/uploads/7/Blender-PNG-Image-File.png", shop: "Moulinex", reduction : 10, description : "En ce moment le blender GX430 est en réduction sur le site Moulinex.fr", user: "Pedro65", price: "24,99€"},
          {img : "https://backend.panzani.fr/app/uploads/2020/03/paniers_associe.png", shop: "Carrefour", reduction : 33, description : "2 paquets de pâtes achetés = 1 offert jusqu'au 03/10/2022", user: "AliceParis", price: "2,99€"}];

  const rec = [
    {
        "id": "f64ab9b3-315e-47fa-b4bd-645b15e17291",
        "name": "lasagne",
        "users": "jiahd",
        "ingredients": "30 g de beurre;15g de farine;75 cl de lait;2 oignons;2 gousses dail;gruyère râpé;1 paquet de lasagnes;poivre;sel;500 g de saumon",
        "image": "https://cdn.pratico-pratiques.com/app/uploads/sites/2/2018/09/17140346/lasagne-au-saumon-fume.jpg",
        "preparation": " Faîtes revenir les oignons finement hachés dans le beurre. Ajoutez lail./ Les opérations suivantes doivent se faire sans cesser de remuer : ajouter la farine puis le lait progressivement./ Ajouter le saumon, le sel, le poivre. Rajouter de la farine ou du lait si cest trop liquide trop épais./ Mettre une première couche de sauce dans un plat à gratin, puis recouvrir de plaques de lasagnes, puis la sauce, et ainsi de suite. Finir par le gruyère râpé./ Faire cuire 45 min au four à 180°C (thermostat 6), jusquà ce quun couteau senfonce sans résistance.",
        "commentaires": "eline/4/tres bon plat;luka/2/recette pas assez complete;wah/5/recette incroyable je vous conseille",
        "note": 0,
        "temps": 30
    },
    {
        "id": "f3b76a0b-244b-42a2-a57b-8e602e48fbeb",
        "name": "Salade de pâte a la tunisienne",
        "users": "rayan",
        "ingredients": "Raisin secs;Coriandre;Huile d’olive;Sel;Poivre;1kg de penne;1 pot de tomate séchée;200gr de feta ",
        "image": "https://www.mesinspirationsculinaires.com/wp-content/uploads/2019/06/salade-froide-de-poulet-1-620x330.jpg",
        "preparation": "Faire bouillir 1L deau salée. Y plonger les pennes et cuire selon le temps indiqué sur le paquet./Égoutter les pâtes. Une fois refroidies, les mettre dans un grand saladier./Découper les tomates séchées en lamelles avant de les ajouter dans le saladier./Ajouter ensuite lhuile dolive, la feta, les raisin secs ainsi que la coriandre. Cest prêt !",
        "commentaires": "eline/4/tres bon plat;luka/2/recette pas assez complete;wah/5/recette incroyable je vous conseille",
        "note": 0,
        "temps": 30
    }];

    return(
      <View style={{flex: 1}}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.navigate('Conversion')} style={styles.profileButton}>
            <Image
            style={{width: 30, height: 30}}
            source={{uri:'https://www.citypng.com/public/uploads/small/11663778115jz3pmhao8azwk5bnorhav9skgqsrptxel8tveqrc8xx6kg0zxzcslqsvm3mmlubfg3vkcd7nxwlw4v0ypcvfirv39s9qqbyhfu2g.png'}}
            />
          </TouchableOpacity>
          <Text style={styles.topText}>Veget'Alim</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.profileButton}>
            <Image
            style={{width: 30, height: 30}}
            source={{uri:'https://icon-library.com/images/white-profile-icon/white-profile-icon-6.jpg'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recettes}>
          <View style={{borderColor: '#515151', borderBottomWidth: 1, borderTopWidth: 1}}>
            <Text style={styles.recettesText}> {'\n'}🔥 Recettes en tendance 🔥{'\n'}</Text>
          </View>
          <FlatList
            data={rec}
           renderItem={({item}) => {return (
             <View style={{border: "solid",
                width: 200,
                 borderTopWidth: 3,
                 borderColor: "#D3D3D3",
                 padding : "3%",
                 paddingTop : "1%",
                 justifyContent: 'center',
                 alignItems: 'center',
                 marginBottom : 3,
             }}>
               <Image style={{width: 100, height: 100}}
                 source={{uri: item.image}}
               />
               <Text style={{fontStyle: 'bold', fontSize: 16}}> {'\n'} {item.name} </Text>
               <TouchableOpacity onPress={() => navigation.navigate('Recettes', item.id)} style={styles.button}>
                 <Text style={{color: "#fff"}}>Voir la recette</Text>
               </TouchableOpacity>
             </View>
           )}}
           keyExtractor={(item) => item.id}
         />
        <View style={{borderColor: '#515151', borderBottomWidth: 1, borderTopWidth: 1}}>
          <Text style={styles.recettesText}> {'\n'}🔥 Bons plans en tendance 🔥{'\n'}</Text>
        </View>

         <FlatList
           data={data}
          renderItem={({item}) => {return (
            <View style={{border: "solid",
                width: 200,
                borderTopWidth: 3,
                borderColor: "#D3D3D3",
                padding : "3%",
                paddingTop : "1%",
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom : 3,
            }}>
              <Text style={{fontStyle: 'bold', fontSize: 16}}> {'\n'} {item.shop} {'\n'} </Text>
              <Image style={{width: 100, height: 100}}
                source={{uri: item.img}}
              />
              <Text style={styles.bons}> {'\n'} {item.price}{'\n'}</Text>
              <Text style={styles.desc}> {item.description} </Text>
              <TouchableOpacity  style={styles.button}>
                <Text style={{color: "#fff"}}>Voir l'offre</Text>
              </TouchableOpacity>
            </View>
          )}}
          keyExtractor={(item) => item.id}
        />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => navigation.navigate('Recette')} style={styles.buttonbottom}>
            <Text style={{color: "#8ECF6F"}}>Toutes les recettes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AccueilBonPlan')} style={styles.buttonbottom}>
            <Text style={{color: "#8ECF6F"}}>Tous les Bons plans</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    button: {
      width: 160,
      height: 30,
      backgroundColor: '#8ECF6F',
      borderRadius: 20,
      marginTop: 20,
      marginBottom: 10,
      borderColor: "#777",
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      elevation: 6,
    },
    buttonbottom: {
      width: 160,
      height: 30,
      backgroundColor: '#F7F7F7',
      borderWidth: 1,
      borderColor: '#8ECF6F',
      borderRadius: 20,
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      elevation: 6,
    },
    top: {
      flex: 0.1,
      backgroundColor: '#8ECF6F',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'right',
      flexDirection: "row"
    },
    topText: {
      color: '#fff',
      fontSize: 22,
    },
    profileButton: {
      textAlign: 'right',
      margin: 10
    },
    recettes: {
      alignItems: 'center',
      fontSize: 50,
      flex: 0.8,
    },
    recettesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#515151"
    },
    bottom: {
      flex: 0.1,
      justifyContent: 'space-evenly',
      flexDirection:'row',
    }
  })
