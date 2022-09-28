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
// import AntDesign from 'react-native-vector-icons/AntDesign';

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
          // marginTop: 20,
          padding: 5,
        }}
      >
        {/* <AntDesign
          onPress={() =>
            navigation.navigate('Recettes', { id: props.route.params.id })
          }
          name="closecircle"
          size={35}
          color={'#103e5c'}
        /> */}
        <View
          style={{
            backgroundColor: '#103e5c',
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
              color: 'white',
              margin: 10,
              width: '80%',
              textAlign: 'center',
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
            </View>
          );
        }}
      />
    </View>
  );
};

export default StepByStepModal;
