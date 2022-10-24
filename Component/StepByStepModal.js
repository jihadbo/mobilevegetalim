import {
  View,
  Text,
  Modal,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const Tab = React.forwardRef(({ data, index, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            fontSize: 80 / data.length,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Étape {index + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollX, data }) => {
  const inputRange = data.map((_, i) => i * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: 'black',
        bottom: -10,
        transform: [
          {
            translateX,
          },
        ],
      }}
    ></Animated.View>
  );
};

const Tabs = ({ data, scrollX, onItemPress }) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      style={{
        marginTop: 20,
        width,
      }}
    >
      <View
        ref={containerRef}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={index}
              index={index}
              data={data}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};

const StepByStepModal = (props) => {
  const navigation = useNavigation();
  let scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}
      >
        <View
          style={{
            backgroundColor: '#BDE9A8',
            flexDirection: 'row',
            minHeight: '5%',
            height: 'auto',
            alignItems: 'center',
            borderRadius: 25,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              color: 'black',
              margin: 10,
              width: '80%',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {props.route.params.recipeName}
          </Text>
        </View>
        <Tabs
          scrollX={scrollX}
          data={props.route.params.preparation}
          onItemPress={onItemPress}
        />
      </View>

      <Animated.FlatList
        ref={ref}
        data={props.route.params.preparation}
        keyExtractor={(_, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                height,
                marginTop: 10,
                padding: 20,
                borderBottomColor: 'black',
              }}
            >
              <Text
                style={{
                  width: '100%',
                  fontSize: 20,
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,

                  elevation: 15,
                }}
              >
                {item.preparation}
              </Text>
              {/[0-9]+[ ]min/g.test(item.preparation) && (
                <View
                  style={{
                    marginVertical: 45,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                    }}
                  >
                    Rien à faire en attendant ? Vous pouvez tester vos
                    connaissances pour patienter :
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Quizz')}
                    style={{
                      backgroundColor: '#cae8ff',
                      padding: 15,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 20,
                      flexDirection: 'row',
                    }}
                  >
                    <View></View>
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      Démarrer le Quizz
                    </Text>
                    <MaterialCommunityIcons
                      name="head-question"
                      style={{
                        fontSize: 30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default StepByStepModal;
